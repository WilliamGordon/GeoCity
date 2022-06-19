import 'dart:ui';
import 'package:geocity/models/city.dart';
import 'package:geocity/models/point_of_crossing.dart';
import 'package:geocity/models/point_of_interest.dart';
import 'package:geocity/models/trip_user_favorite.dart';
import 'package:geocity/views/icons/icons.dart';
import 'package:geocity/views/theme/app_theme.dart';
import 'package:geocity/views/trip_list_view.dart';
import 'package:geocity/views/theme/design_course_app_theme.dart';
import 'package:geocity/views/theme/fitness_app_theme.dart';
import 'package:geocity/views/theme/hotel_app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';
import 'package:latlong2/latlong.dart';
import '../main.dart';
import '../models/itinary.dart';
import '../models/points.dart';
import '../models/trip.dart';
import '../services/HttpService.dart';

class TripReaderScreen extends StatefulWidget {
  final String? id;
  const TripReaderScreen(this.id);
  @override
  _TripReaderScreenState createState() => _TripReaderScreenState();
}

class _TripReaderScreenState extends State<TripReaderScreen> with TickerProviderStateMixin {
  // API DATA
  late Trip tripData;
  late TripUserFavorite tripFavoriteData = new TripUserFavorite(id: "", userId: "", tripId: "");
  late Itinary itinaryData;
  late Points pointsData;

  // MAP ACTION DATA
  late bool isMapRead = false;
  late MapController mapController;

  // COSMETIC DATA
  late List<Marker> markers = <Marker>[];
  final double infoHeight = 364.0;
  AnimationController? animationController;

  @override
  void initState() {
    animationController = AnimationController(duration: const Duration(milliseconds: 1000), vsync: this);
    // Instantiate Map Control for action
    if (!isMapRead) {
      mapController = MapController();
    }
    mapController.onReady.then((v) {
      isMapRead = true;
    });

    // Start by getting the info of the trip
    fetchTrip();
    fetchTripFavorite();

    super.initState();
  }

  fetchTrip() async {
    final HttpService httpService = HttpService();
    var trip = await httpService.fetchTrip(widget.id);
    fetchItinary(trip.itinaries[0].id);
    print("trip is loaded" + trip.name);
    setState(() {
      tripData = trip;
    });
  }

  fetchTripFavorite() async {
    final HttpService httpService = HttpService();
    var tripFavorite = await httpService.fetchTripFavoriteForTrip(widget.id, "");
    print("trip favorite is loaded" + tripFavorite.id);
    setState(() {
      tripFavoriteData = tripFavorite;
    });
  }

  postTripFavorite(String tripId, String userId) async {
    final HttpService httpService = HttpService();
    var tripFavorite = await httpService.AddTripToFavorite(tripData.id, "");
    setState(() {
      tripFavoriteData = new TripUserFavorite(id: tripFavorite, userId: userId, tripId: tripId);
    });
  }

  deleteTripFavorite(String tripFavoriteId) async {
    final HttpService httpService = HttpService();
    var tripFavorite = await httpService.RemoveTripFromFavorite(tripFavoriteId);
    setState(() {
      tripFavoriteData = new TripUserFavorite(id: "", userId: "", tripId: "");
    });
  }

  fetchItinary(itinaryId) async {
    final HttpService httpService = HttpService();
    var itinary = await httpService.fetchItinary(itinaryId);
    fetchPoints(itinary.id);
    print("itinary is loaded" + itinary.id);
    setState(() {
      itinaryData = itinary;
    });
  }

  fetchPoints(itinaryId) async {
    final HttpService httpService = HttpService();
    var points = await httpService.fetchPoints(itinaryId);
    print("points is loaded");
    setMarkers(points);
    ZoomInCluster();
    setState(() {
      pointsData = points;
    });
  }

  switchItinary(itinaryId) {
    fetchItinary(itinaryId);
  }

  void ZoomInCluster() {
    // move map to first marker
    if (markers.length > 0 && isMapRead) {
      mapController.move(LatLng(markers[0].point.latitude, markers[0].point.longitude), 12);
    }
  }

  List<Marker> setMarkers(points) {
    markers = <Marker>[];
    for (var poi in points.pointOfInterests) {
      markers.add(Marker(
        point: LatLng(poi.latitude.toDouble(), poi.longitude.toDouble()),
        builder: (context) => IconButton(
          icon: Icon(
            MyFlutterApp.pin_poc,
            color: const Color.fromARGB(255, 13, 110, 10),
          ),
          onPressed: () {
            _onButtonPressedPOI(poi);
          },
        ),
      ));
    }
    for (var poc in points.pointOfCrossings) {
      markers.add(Marker(
        point: LatLng(poc.latitude.toDouble(), poc.longitude.toDouble()),
        builder: (context) => IconButton(
          icon: Icon(
            MyFlutterApp.pin_poc,
            color: const Color.fromARGB(255, 158, 8, 33),
          ), //<-- SEE HERE
          onPressed: () {
            _onButtonPressedPOC(poc);
          },
        ),
      ));
    }
    return markers;
  }

  void _onButtonPressedPOC(PointOfCrossing poc) {
    showModalBottomSheet(
        context: context,
        builder: (context) {
          return Container(
            height: MediaQuery.of(context).size.height * 0.1,
            decoration: new BoxDecoration(
              color: Colors.white,
              borderRadius: new BorderRadius.only(
                topLeft: const Radius.circular(25.0),
                topRight: const Radius.circular(25.0),
              ),
            ),
            child: Column(
              children: <Widget>[
                ListTile(leading: Icon(Icons.explore), title: Text(poc.description.toString())),
              ],
            ),
          );
        });
  }

  void _onButtonPressedPOI(PointOfInterest poi) {
    showModalBottomSheet(
        context: context,
        builder: (context) {
          return Container(
            height: MediaQuery.of(context).size.height * 0.25,
            decoration: new BoxDecoration(
              color: Colors.white,
              borderRadius: new BorderRadius.only(
                topLeft: const Radius.circular(25.0),
                topRight: const Radius.circular(25.0),
              ),
            ),
            child: Column(
              children: <Widget>[
                getItemPoint("Name : ", poi.name),
                getItemPoint("category : ", poi.category),
                getItemPoint("description : ", poi.description.toString()),
                getItemPoint("price : ", poi.price.toString()),
                getItemPoint("duration : ", poi.duration.toString()),
              ],
            ),
          );
        });
  }

  @override
  void dispose() {
    animationController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final double tempHeight = MediaQuery.of(context).size.height - (MediaQuery.of(context).size.width / 1.2) + 24.0;
    return Theme(
        data: HotelAppTheme.buildLightTheme(),
        child: FutureBuilder(
            future: HttpService().fetchTrip(widget.id),
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return Text('LOADING');
              } else {
                return Container(
                  child: Scaffold(
                    body: Stack(
                      children: <Widget>[
                        Column(
                          children: <Widget>[
                            getAppBarUI(),
                            getMap((snapshot.data as Trip).city, markers),
                          ],
                        ),
                        Positioned(
                            left: 20.0,
                            top: 75.0,
                            child: Padding(
                              padding: const EdgeInsets.all(0),
                              child: Expanded(
                                child: new Container(
                                  width: 450.0,
                                  decoration: BoxDecoration(
                                    gradient: LinearGradient(colors: [Colors.white, AppTheme.white], begin: Alignment.topLeft, end: Alignment.bottomRight),
                                    borderRadius: BorderRadius.only(
                                        topLeft: Radius.circular(8.0), bottomLeft: Radius.circular(8.0), bottomRight: Radius.circular(8.0), topRight: Radius.circular(8.0)),
                                    boxShadow: <BoxShadow>[
                                      BoxShadow(color: FitnessAppTheme.grey.withOpacity(0.6), offset: Offset(1.1, 1.1), blurRadius: 10.0),
                                    ],
                                  ),
                                  child: Column(
                                    children: <Widget>[
                                      Padding(
                                        padding: const EdgeInsets.only(top: 16, left: 16, right: 24),
                                        child: Column(
                                          mainAxisAlignment: MainAxisAlignment.center,
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: <Widget>[
                                            Row(
                                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                              crossAxisAlignment: CrossAxisAlignment.center,
                                              children: <Widget>[
                                                Row(
                                                  mainAxisAlignment: MainAxisAlignment.center,
                                                  crossAxisAlignment: CrossAxisAlignment.end,
                                                  children: <Widget>[
                                                    Padding(
                                                      padding: const EdgeInsets.only(left: 4, bottom: 3),
                                                      child: Text(
                                                        (snapshot.data as Trip).name,
                                                        textAlign: TextAlign.center,
                                                        style: TextStyle(
                                                          fontFamily: FitnessAppTheme.fontName,
                                                          fontWeight: FontWeight.w600,
                                                          fontSize: 22,
                                                          color: AppTheme.geoctiy,
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                                Column(
                                                  mainAxisAlignment: MainAxisAlignment.center,
                                                  crossAxisAlignment: CrossAxisAlignment.end,
                                                  children: <Widget>[
                                                    Row(
                                                      mainAxisAlignment: MainAxisAlignment.center,
                                                      children: <Widget>[
                                                        Icon(
                                                          Icons.access_time,
                                                          color: FitnessAppTheme.grey.withOpacity(0.5),
                                                          size: 16,
                                                        ),
                                                        Padding(
                                                          padding: const EdgeInsets.only(left: 4.0),
                                                          child: Text(
                                                            'Today 8:26 AM',
                                                            textAlign: TextAlign.center,
                                                            style: TextStyle(
                                                              fontFamily: FitnessAppTheme.fontName,
                                                              fontWeight: FontWeight.w500,
                                                              fontSize: 14,
                                                              letterSpacing: 0.0,
                                                              color: FitnessAppTheme.grey.withOpacity(0.5),
                                                            ),
                                                          ),
                                                        ),
                                                        GestureDetector(
                                                          onTap: () {
                                                            if (tripFavoriteData.id == "") {
                                                              postTripFavorite(tripData.id, "");
                                                            } else {
                                                              deleteTripFavorite(tripFavoriteData.id);
                                                            }
                                                          },
                                                          child: Card(
                                                            color: AppTheme.geoctiy,
                                                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50.0)),
                                                            elevation: 10.0,
                                                            child: Container(
                                                              width: 30,
                                                              height: 30,
                                                              child: Center(
                                                                child: Icon(
                                                                  Icons.favorite,
                                                                  color: (tripFavoriteData.id == "") ? DesignCourseAppTheme.nearlyWhite : Colors.red,
                                                                  size: 15,
                                                                ),
                                                              ),
                                                            ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                    Padding(
                                                      padding: const EdgeInsets.only(top: 4, bottom: 14),
                                                      child: Text(
                                                        (snapshot.data as Trip).city.name,
                                                        textAlign: TextAlign.center,
                                                        style: TextStyle(
                                                          fontFamily: FitnessAppTheme.fontName,
                                                          fontWeight: FontWeight.w500,
                                                          fontSize: 12,
                                                          letterSpacing: 0.0,
                                                          color: FitnessAppTheme.nearlyDarkBlue,
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                )
                                              ],
                                            )
                                          ],
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(left: 24, right: 24, top: 8, bottom: 8),
                                        child: Container(
                                          height: 2,
                                          decoration: BoxDecoration(
                                            color: FitnessAppTheme.background,
                                            borderRadius: BorderRadius.all(Radius.circular(4.0)),
                                          ),
                                        ),
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(left: 24, right: 24, top: 8, bottom: 16),
                                        child: Row(children: getItinariesButtons((snapshot.data as Trip))),
                                      )
                                    ],
                                  ),
                                ),
                              ),
                            )),
                      ],
                    ),
                  ),
                );
              }
            }));
  }

  Widget getMap(City city, List<Marker> markers) {
    return Flexible(
      child: FlutterMap(
          mapController: mapController,
          layers: [
            TileLayerOptions(
              urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              subdomains: ['a', 'b', 'c'],
              attributionBuilder: (_) {
                return Text("© OpenStreetMap contributors");
              },
            ),
            MarkerLayerOptions(markers: markers),
          ],
          options: MapOptions(center: LatLng(city.latitude, city.longitude), zoom: 12)),
    );
  }

  List<Widget> getItinariesButtons(Trip trip) {
    List<Widget> itinaryButton = <Widget>[];
    for (var itinary in trip.itinaries) {
      itinaryButton.add(getItinaryButton(itinary));
    }

    return itinaryButton;
  }

  Widget getItinaryButton(Itinary itinary) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: GestureDetector(
        onTap: (() => {switchItinary(itinary.id)}),
        child: Container(
          decoration: BoxDecoration(
            color: AppTheme.geoctiy,
            borderRadius: const BorderRadius.all(Radius.circular(16.0)),
            boxShadow: <BoxShadow>[
              BoxShadow(color: DesignCourseAppTheme.grey.withOpacity(0.2), offset: const Offset(1.1, 1.1), blurRadius: 8.0),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.only(left: 18.0, right: 18.0, top: 4.0, bottom: 4.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Text(
                  itinary.day.toString(),
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                    letterSpacing: 0.27,
                    color: AppTheme.white,
                  ),
                ),
                Text(
                  "Day",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontWeight: FontWeight.w200,
                    fontSize: 14,
                    letterSpacing: 0.27,
                    color: AppTheme.white,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget getItemPoint(String label, String value) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: GestureDetector(
        child: Container(
          decoration: BoxDecoration(
            color: AppTheme.white,
            borderRadius: const BorderRadius.all(Radius.circular(16.0)),
            boxShadow: <BoxShadow>[
              BoxShadow(color: DesignCourseAppTheme.grey.withOpacity(0.2), offset: const Offset(1.1, 1.1), blurRadius: 8.0),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.only(left: 18.0, right: 18.0, top: 4.0, bottom: 4.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Text(
                  label + " " + value,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                    letterSpacing: 0.27,
                    color: AppTheme.geoctiy,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget getAppBarUI() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.geoctiy,
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.grey.withOpacity(1), offset: const Offset(0, 2), blurRadius: 8.0),
        ],
      ),
      child: Padding(
        padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top, left: 8, right: 8),
        child: Row(
          children: <Widget>[
            Container(
              alignment: Alignment.centerLeft,
              width: AppBar().preferredSize.height + 40,
              height: AppBar().preferredSize.height,
              child: Material(
                color: AppTheme.geoctiy,
                child: InkWell(
                  borderRadius: const BorderRadius.all(
                    Radius.circular(32.0),
                  ),
                  onTap: () {
                    Navigator.pop(context);
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Icon(Icons.arrow_back),
                  ),
                ),
              ),
            ),
            Expanded(
              child: Center(
                child: Text(
                  'Geocity',
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 22, color: Colors.white),
                ),
              ),
            ),
            Container(
              width: AppBar().preferredSize.height + 40,
              height: AppBar().preferredSize.height,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[],
              ),
            )
          ],
        ),
      ),
    );
  }
}

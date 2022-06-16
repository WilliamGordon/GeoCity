// ignore_for_file: unnecessary_this

import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import '../models/itinary.dart';
import '../models/points.dart';
import '../models/trip.dart';
import '../models/trip_overview.dart';
import '../services/http_service.dart';

class TripReader extends StatefulWidget {
  final String id;
  const TripReader(this.id);
  @override
  _TripReader createState() => _TripReader();
}

class _TripReader extends State<TripReader> {
  late Trip _Trip;
  late Itinary _Itinary;
  late Points _Points;
  var items = [
    'Day 1',
  ];
  List<Marker> markers = <Marker>[];

  String dropdownValue = 'Day 1';

  List<String> getDropdownValues() {
    items = [
      'Day 1',
    ];
    for (Itinary itinary in _Trip.itinaries) {
      if (itinary.day != 1) {
        items.add('Day ' + itinary.day.toString());
      }
    }
    return items;
  }

  @override
  void initState() {
    super.initState();
    print("INIT STATE!");
    fetchTrip();
  }

  fetchTrip() async {
    final HttpService httpService = HttpService();
    var trip = await httpService.fetchTrip(widget.id);
    fetchItinary(trip.itinaries[0].id);
    print("trip is loaded" + trip.name);
    setState(() {
      _Trip = trip;
    });
  }

  fetchItinary(itinaryId) async {
    final HttpService httpService = HttpService();
    var itinary = await httpService.fetchItinary(itinaryId);
    fetchPoints(itinary.id);
    print("itinary is loaded" + itinary.id);
    setState(() {
      _Itinary = itinary;
    });
  }

  fetchPoints(itinaryId) async {
    final HttpService httpService = HttpService();
    var points = await httpService.fetchPoints(itinaryId);
    print("points is loaded");
    setMarkers(points);
    setState(() {
      _Points = points;
    });
  }

  switchItinary(itinaryDay) {
    String itinaryId = "";
    for (var itinary in _Trip.itinaries) {
      print(itinary.id);
      print(itinary.day);
      if (itinaryDay.toString().contains(itinary.day.toString())) {
        itinaryId = itinary.id;
      }
    }
    fetchItinary(itinaryId);
  }

  List<Marker> setMarkers(points) {
    markers = <Marker>[];
    for (var poi in points.pointOfInterests) {
      markers.add(Marker(
          point: LatLng(poi.latitude.toDouble(), poi.longitude.toDouble()),
          builder: (context) => Icon(Icons.pin_drop)));
    }
    for (var poc in points.pointOfCrossings) {
      markers.add(Marker(
          point: LatLng(poc.latitude.toDouble(), poc.longitude.toDouble()),
          builder: (context) => Icon(Icons.pin_drop)));
    }
    return markers;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("Geoctiy"),
          centerTitle: true,
          backgroundColor: Color.fromARGB(255, 16, 55, 122),
        ),
        body: FutureBuilder(
            future: HttpService().fetchTrip(widget.id),
            builder: (context, snapshot) {
              if (!snapshot.hasData) {
                return Text("Loading DATA");
              }
              return Center(
                child: Column(
                  children: [
                    Positioned(
                      left: 0,
                      top: 0,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Flexible(
                            fit: FlexFit.tight,
                            flex: 1,
                            child: TripHeader(snapshot.data as Trip),
                          ),
                          Container(
                              width: 210,
                              height: 80,
                              decoration: BoxDecoration(
                                border: Border.all(),
                              ),
                              child: DropdownButton(
                                value: dropdownValue,
                                icon: const Icon(Icons.keyboard_arrow_down),
                                items: getDropdownValues().map((String items) {
                                  return DropdownMenuItem(
                                    value: items,
                                    child: Text(items,
                                        style: TextStyle(fontSize: 22)),
                                  );
                                }).toList(),
                                onChanged: (String? newValue) {
                                  setState(() {
                                    dropdownValue = newValue!;
                                    switchItinary(dropdownValue);
                                  });
                                },
                              )),
                        ],
                      ),
                    ),
                    Flexible(
                      child: FlutterMap(
                          layers: [
                            TileLayerOptions(
                              urlTemplate:
                                  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                              subdomains: ['a', 'b', 'c'],
                              attributionBuilder: (_) {
                                return Text("© OpenStreetMap contributors");
                              },
                            ),
                            MarkerLayerOptions(markers: markers),
                          ],
                          options: MapOptions(
                              center: LatLng(
                                  _Trip.city.latitude, _Trip.city.longitude),
                              zoom: 12)),
                    )
                  ],
                ),
              );
            }));
  }
}

class MapReader extends StatefulWidget {
  const MapReader(this.trip);
  final Trip trip;
  @override
  State<MapReader> createState() => _Map();
}

class _Map extends State<MapReader> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: HttpService().fetchPoints(widget.trip.itinaries[0].id),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return Text("Loading DATA");
          }
          return FlutterMap(
              layers: [
                TileLayerOptions(
                  urlTemplate:
                      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  subdomains: ['a', 'b', 'c'],
                  attributionBuilder: (_) {
                    return Text("© OpenStreetMap contributors");
                  },
                ),
                MarkerLayerOptions(
                    markers: getMarkers(snapshot.data as Points)),
              ],
              options: MapOptions(
                  center: LatLng(
                      widget.trip.city.latitude, widget.trip.city.longitude),
                  zoom: 12));
        });
  }

  List<Marker> getMarkers(Points points) {
    List<Marker> markers = <Marker>[];
    for (var poi in points.pointOfInterests) {
      markers.add(Marker(
          point: LatLng(poi.latitude.toDouble(), poi.longitude.toDouble()),
          builder: (context) => Icon(Icons.pin_drop)));
    }
    for (var poc in points.pointOfCrossings) {
      markers.add(Marker(
          point: LatLng(poc.latitude.toDouble(), poc.longitude.toDouble()),
          builder: (context) => Icon(Icons.pin_drop)));
    }
    return markers;
  }
}

class TripHeader extends StatefulWidget {
  const TripHeader(this.trip);
  final Trip trip;
  @override
  State<TripHeader> createState() => _TripHeader();
}

class _TripHeader extends State<TripHeader> {
  String dropdownValue = 'One';

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 80,
      decoration: BoxDecoration(
        border: Border.all(),
      ),
      child: Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 20),
          child: Text(widget.trip.name, style: TextStyle(fontSize: 22))),
    );
  }
}

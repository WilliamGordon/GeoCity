import 'dart:ui';
import 'package:geocity/models/trip.dart';
import 'package:geocity/views/theme/app_theme.dart';
import 'package:geocity/views/trip_list_view.dart';
import 'package:geocity/models/trip_overview.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:intl/intl.dart';
import '../services/HttpService.dart';
import 'theme/hotel_app_theme.dart';

class TripParticipantScreen extends StatefulWidget {
  @override
  _TripParticipantScreenState createState() => _TripParticipantScreenState();
}

class _TripParticipantScreenState extends State<TripParticipantScreen> with TickerProviderStateMixin {
  AnimationController? animationController;
  List<TripOverview> hotelList = <TripOverview>[];
  var searchBarController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  DateTime startDate = DateTime.now();
  DateTime endDate = DateTime.now().add(const Duration(days: 5));

  @override
  void initState() {
    animationController = AnimationController(duration: const Duration(milliseconds: 1000), vsync: this);
    super.initState();
  }

  Future<bool> getData() async {
    await Future<dynamic>.delayed(const Duration(milliseconds: 200));
    return true;
  }

  @override
  void dispose() {
    animationController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: HotelAppTheme.buildLightTheme(),
      child: Container(
        child: Scaffold(
          body: Stack(
            children: <Widget>[
              InkWell(
                splashColor: Colors.transparent,
                focusColor: Colors.transparent,
                highlightColor: Colors.transparent,
                hoverColor: Colors.transparent,
                onTap: () {
                  FocusScope.of(context).requestFocus(FocusNode());
                },
                child: Column(
                  children: <Widget>[
                    getAppBarUI(),
                    Expanded(
                      child: NestedScrollView(
                          controller: _scrollController,
                          headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
                            return <Widget>[
                              SliverList(
                                delegate: SliverChildBuilderDelegate((BuildContext context, int index) {
                                  return Column(
                                    children: <Widget>[],
                                  );
                                }, childCount: 1),
                              ),
                            ];
                          },
                          body: FutureBuilder(
                              future: HttpService().fetchMyTrips("userId"),
                              builder: (context, snapshot) {
                                if (!snapshot.hasData) {
                                  return Text('LOADING');
                                } else {
                                  return Container(
                                    color: Colors.white,
                                    child: ListView.builder(
                                      itemCount: (snapshot.data as List<TripOverview>).length,
                                      padding: const EdgeInsets.only(top: 8),
                                      scrollDirection: Axis.vertical,
                                      itemBuilder: (BuildContext context, int index) {
                                        final int count = (snapshot.data as List<TripOverview>).length > 10 ? 10 : (snapshot.data as List<TripOverview>).length;
                                        final Animation<double> animation = Tween<double>(begin: 0.0, end: 1.0)
                                            .animate(CurvedAnimation(parent: animationController!, curve: Interval((1 / count) * index, 1.0, curve: Curves.fastOutSlowIn)));
                                        animationController?.forward();
                                        return TripListView(
                                          callback: () {},
                                          tripData: (snapshot.data as List<TripOverview>)[index],
                                          animation: animation,
                                          animationController: animationController!,
                                        );
                                      },
                                    ),
                                  );
                                }
                              })),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget getHotelViewList() {
    final List<Widget> hotelListViews = <Widget>[];
    for (int i = 0; i < hotelList.length; i++) {
      final int count = hotelList.length;
      final Animation<double> animation = Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(
          parent: animationController!,
          curve: Interval((1 / count) * i, 1.0, curve: Curves.fastOutSlowIn),
        ),
      );
      hotelListViews.add(
        TripListView(
          callback: () {},
          // hotelData: hotelList[i],
          animation: animation,
          animationController: animationController!,
        ),
      );
    }
    animationController?.forward();
    return Column(
      children: hotelListViews,
    );
  }

  void fetchMyTrips() async {
    final HttpService httpService = HttpService();
    String searchString = "nyc";
    if (searchBarController.text == "") {
      searchString = "nyc";
    } else {
      searchString = searchBarController.text;
    }
    var TripOverviews = await httpService.fetchMyTrips(searchString);

    setState(() {
      hotelList = TripOverviews.cast<TripOverview>();
    });
  }

  Widget getAppBarUI() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.geoctiy,
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.grey.withOpacity(0.2), offset: const Offset(0, 2), blurRadius: 8.0),
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
                  'My Trips',
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

class ContestTabHeader extends SliverPersistentHeaderDelegate {
  ContestTabHeader(
    this.searchUI,
  );
  final Widget searchUI;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    return searchUI;
  }

  @override
  double get maxExtent => 52.0;

  @override
  double get minExtent => 52.0;

  @override
  bool shouldRebuild(SliverPersistentHeaderDelegate oldDelegate) {
    return false;
  }
}

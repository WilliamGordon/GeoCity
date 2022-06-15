import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import '../models/trip_overview.dart';
import '../services/http_service.dart';

class TripReader extends StatefulWidget {
  final String tripId;
  const TripReader(this.tripId);

  @override
  State<StatefulWidget> createState() {
    return _TripReader(tripId);
  }
}

class _TripReader extends State<TripReader> {
  final String tripId = "";
  _TripReader(tripId);
  List<TripOverview> _trips = <TripOverview>[];

  @override
  void initState() {
    super.initState();
    fetchTrips();
  }

  void fetchTrips() async {
    final HttpService httpService = HttpService();
    var trips = await httpService.getTripOverviews("bxl");

    setState(() {
      _trips = trips;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.tripId),
        centerTitle: true,
        backgroundColor: Color.fromARGB(255, 16, 55, 122),
      ),
      body: Center(
        child: Column(
          children: [
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
                    MarkerLayerOptions(markers: [
                      Marker(
                        point: LatLng(50.850340, 4.351710),
                        builder: (context) => Icon(Icons.pin_drop),
                      )
                    ]),
                  ],
                  options:
                      MapOptions(center: LatLng(50.850340, 4.351710), zoom: 8)),
            )
          ],
        ),
      ),
    );
  }
}

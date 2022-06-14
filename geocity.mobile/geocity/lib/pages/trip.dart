import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class Trip extends StatelessWidget {
  const Trip({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Trip'),
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

import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Geocity',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Geocity'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Color.fromARGB(255, 16, 55, 122),
        elevation: 4.0,
        actions: [
          IconButton(onPressed: () => {}, icon: Icon(Icons.supervisor_account)),
          IconButton(onPressed: () => {}, icon: Icon(Icons.favorite)),
        ],
        leading: IconButton(onPressed: () => {}, icon: Icon(Icons.explore)),
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

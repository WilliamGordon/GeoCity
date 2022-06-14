import 'package:flutter/material.dart';

class Trips extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _Trips();
  }
}

class _Trips extends State<Trips> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Trips'),
        centerTitle: true,
        backgroundColor: Color.fromARGB(255, 16, 55, 122),
      ),
    );
  }
}

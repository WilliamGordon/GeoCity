import 'package:flutter/material.dart';

class Explore extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _Explore();
  }
}

class _Explore extends State<Explore> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Search Trips'),
          centerTitle: true,
          backgroundColor: Color.fromARGB(255, 16, 55, 122),
        ),
        body: Container(
          child: Row(
            children: [
              const Expanded(
                  child: Padding(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextField(
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: 'Enter a search term',
                  ),
                ),
              )),
              CircleAvatar(
                  radius: 25,
                  backgroundColor: Color.fromARGB(255, 16, 55, 122),
                  child: IconButton(
                      color: Colors.white,
                      onPressed: () {},
                      icon: Icon(Icons.search)))
            ],
          ),
        ));
  }
}

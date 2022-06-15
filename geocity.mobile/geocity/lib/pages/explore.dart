import 'package:flutter/material.dart';

import '../models/trip_overview.dart';
import '../services/http_service.dart';
import 'package:geocity/pages/Trip_reader.dart';

class Explore extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _Explore();
  }
}

//  resizeToAvoidBottomInset: false, // set it to false
//   body: SingleChildScrollView(child: YourBody()),

class _Explore extends State<Explore> {
  // ignore: deprecated_member_use
  var myController = TextEditingController();
  final String _searchWord = "";
  List<TripOverview> _TripOverviews = <TripOverview>[];

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // ignore: prefer_const_constructors
        title: Text('Search TripOverviews'),
        centerTitle: true,
        backgroundColor: const Color.fromARGB(255, 16, 55, 122),
      ),
      resizeToAvoidBottomInset: false, // set it to false
      body: Column(
        children: <Widget>[
          Row(
            children: [
              Expanded(
                  child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 16),
                child: TextField(
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: 'Search For a TripOverview',
                  ),
                  controller: myController,
                ),
              )),
              CircleAvatar(
                  radius: 25,
                  backgroundColor: const Color.fromARGB(255, 16, 55, 122),
                  child: IconButton(
                      color: Colors.white,
                      onPressed: () {
                        fetchTripOverviews();
                      },
                      icon: const Icon(Icons.search)))
            ],
          ),
          Expanded(
              child: Column(children: <Widget>[
            Expanded(
                child: ListView.builder(
              itemCount: _TripOverviews.length,
              shrinkWrap: true,
              itemBuilder: (context, index) {
                return GestureDetector(
                  onTap: (() => {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                    TripReader(_TripOverviews[index].id)))
                      }),
                  child: Card(
                    elevation: 4,
                    child: ListTile(
                      title: Text(
                        "${_TripOverviews[index].name} ${_TripOverviews[index].city.name}",
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                );
              },
            ))
          ]))
        ],
      ),
    );
  }

  void fetchTripOverviews() async {
    final HttpService httpService = HttpService();
    var TripOverviews = await httpService.getTripOverviews(myController.text);

    setState(() {
      _TripOverviews = TripOverviews;
    });
  }
}

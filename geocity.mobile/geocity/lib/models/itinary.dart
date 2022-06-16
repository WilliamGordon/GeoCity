import 'dart:convert';

import 'package:geocity/models/city.dart';
import 'package:geocity/models/point_of_crossing.dart';
import 'package:geocity/models/point_of_interest.dart';

List<Itinary> ItinaryFromJson(String str) =>
    List<Itinary>.from(json.decode(str).map((x) => Itinary.fromJson(x)));
String ItinaryToJson(List<Itinary> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Itinary {
  Itinary({
    required this.id,
    required this.createdDate,
    required this.modifiedDate,
    required this.day,
    this.duration = 0,
    this.distance = 0,
    required this.tripId,
    required this.pointOfInterests,
    required this.pointOfCrossings,
  });
  String id;
  String createdDate;
  String modifiedDate;
  num day;
  num? duration;
  num? distance;
  String tripId;
  List<PointOfInterest> pointOfInterests;
  List<PointOfCrossing> pointOfCrossings;

  factory Itinary.fromJson(Map<String, dynamic> json) {
    var listPOI = json["itinaryPointOfInterest"] as List;
    var listPOC = json["itinaryPointOfCrossing"] as List;
    List<PointOfInterest> poiList =
        listPOI.map((i) => PointOfInterest.fromJson(i)).toList();
    List<PointOfCrossing> pocList =
        listPOC.map((i) => PointOfCrossing.fromJson(i)).toList();

    return Itinary(
      id: json["id"],
      createdDate: json["createdDate"],
      modifiedDate: json["modifiedDate"],
      day: json["day"],
      duration: json["duration"],
      distance: json["distance"],
      tripId: json["tripId"],
      pointOfInterests: poiList,
      pointOfCrossings: pocList,
    );
  }
  Map<String, dynamic> toJson() => {
        "id": id,
        "createdDate": createdDate,
        "modifiedDate": modifiedDate,
        "day": day,
        "duration": duration,
        "distance": distance,
        "tripId": tripId,
      };
}

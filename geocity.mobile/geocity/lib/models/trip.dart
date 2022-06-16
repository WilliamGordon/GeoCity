import 'dart:convert';

import 'package:geocity/models/city.dart';
import 'package:geocity/models/itinary.dart';

List<Trip> TripFromJson(String str) =>
    List<Trip>.from(json.decode(str).map((x) => Trip.fromJson(x)));
String TripToJson(List<Trip> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Trip {
  Trip({
    required this.id,
    required this.name,
    required this.description,
    required this.createdDate,
    required this.modifiedDate,
    required this.days,
    required this.cityId,
    required this.city,
    required this.itinaries,
  });
  String id;
  String name;
  String description;
  String createdDate;
  String modifiedDate;
  num days;
  String cityId;
  City city;
  List<Itinary> itinaries;

  factory Trip.fromJson(Map<String, dynamic> json) {
    var list = json["itinaries"] as List;
    List<Itinary> itinaryList = list.map((i) => Itinary.fromJson(i)).toList();

    return Trip(
        id: json["id"],
        name: json["name"],
        description: json["description"],
        createdDate: json["createdDate"],
        modifiedDate: json["modifiedDate"],
        days: json["days"],
        cityId: json["cityId"],
        city: City.fromJson(json['city']),
        itinaries: itinaryList);
  }
  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "description": description,
        "createdDate": createdDate,
        "modifiedDate": modifiedDate,
        "days": days,
        "cityId": cityId,
      };
}

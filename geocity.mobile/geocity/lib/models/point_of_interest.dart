import 'dart:convert';

import 'package:geocity/models/city.dart';

List<PointOfInterest> PointOfInterestFromJson(String str) =>
    List<PointOfInterest>.from(
        json.decode(str).map((x) => PointOfInterest.fromJson(x)));
String PointOfInterestToJson(List<PointOfInterest> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class PointOfInterest {
  PointOfInterest({
    required this.id,
    required this.createdDate,
    required this.modifiedDate,
    this.price,
    this.duration,
    this.description,
    required this.osmId,
    required this.name,
    required this.category,
    required this.latitude,
    required this.longitude,
    required this.isSuggestion,
    required this.position,
  });
  String id;
  String createdDate;
  String modifiedDate;
  num? price;
  num? duration;
  String? description;
  String osmId;
  String name;
  String category;
  num latitude;
  num longitude;
  bool isSuggestion;
  num position;

  factory PointOfInterest.fromJson(Map<String, dynamic> json) =>
      PointOfInterest(
        id: json["id"],
        createdDate: json["createdDate"],
        modifiedDate: json["modifiedDate"],
        price: json["price"],
        duration: json["duration"],
        description: json["description"],
        osmId: json["osmId"],
        name: json["name"],
        category: json["category"],
        latitude: json["latitude"],
        longitude: json["longitude"],
        isSuggestion: json["isSuggestion"],
        position: json["position"],
      );
  Map<String, dynamic> toJson() => {
        "id": id,
        "createdDate": createdDate,
        "modifiedDate": modifiedDate,
        "price": price,
        "duration": duration,
        "description": description,
        "osmId": osmId,
        "name": name,
        "category": category,
        "latitude": latitude,
        "longitude": longitude,
        "isSuggestion": isSuggestion,
        "position": position,
      };
}

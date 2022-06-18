import 'dart:convert';

import 'city.dart';

List<TripOverview> TripOverviewFromJson(String str) => List<TripOverview>.from(
    json.decode(str).map((x) => TripOverview.fromJson(x)));
String TripOverviewToJson(List<TripOverview> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class TripOverview {
  TripOverview({
    required this.id,
    required this.name,
    required this.description,
    required this.createdDate,
    required this.modifiedDate,
    required this.days,
    required this.price,
    required this.duration,
    required this.distance,
    required this.rating,
    required this.cityId,
    required this.city,
  });
  String id;
  String name;
  String description;
  String createdDate;
  String modifiedDate;
  num days;
  double price;
  num duration;
  double distance;
  num rating;
  String cityId;
  City city;

  factory TripOverview.fromJson(Map<String, dynamic> json) => TripOverview(
        id: json["id"],
        name: json["name"],
        description: json["description"],
        createdDate: json["createdDate"],
        modifiedDate: json["modifiedDate"],
        days: json["days"],
        price: json["price"],
        duration: json["duration"],
        distance: json["distance"],
        rating: json["rating"],
        cityId: json["cityId"],
        city: City.fromJson(json['city']),
      );
  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "description": description,
        "createdDate": createdDate,
        "modifiedDate": modifiedDate,
        "days": days,
        "price": price,
        "duration": duration,
        "distance": distance,
        "rating": rating,
        "cityId": cityId,
      };
}

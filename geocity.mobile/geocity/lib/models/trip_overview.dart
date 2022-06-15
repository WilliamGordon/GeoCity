import 'dart:convert';

import 'package:geocity/models/city.dart';

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
  int days;
  double price;
  int duration;
  double distance;
  int rating;
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

// [
//   {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "createdDate": "2022-06-15T09:46:38.992Z",
//     "modifiedDate": "2022-06-15T09:46:38.992Z",
//     "name": "string",
//     "description": "string",
//     "days": 0,
//     "price": 0,
//     "duration": 0,
//     "distance": 0,
//     "rating": 0,
//     "isPublished": true,
//     "link": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "cityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "city": {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "createdDate": "2022-06-15T09:46:38.992Z",
//       "modifiedDate": "2022-06-15T09:46:38.992Z",
//       "name": "string",
//       "latitude": 0,
//       "longitude": 0
//     },
//     "TripOverviewUsers": [
//       {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "createdDate": "2022-06-15T09:46:38.992Z",
//         "modifiedDate": "2022-06-15T09:46:38.992Z",
//         "TripOverviewId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "TripOverview": "string",
//         "userId": "string",
//         "user": {
//           "id": "string",
//           "firstname": "string",
//           "lastname": "string",
//           "email": "string"
//         },
//         "isOwner": true
//       }
//     ]
//   }
// ]

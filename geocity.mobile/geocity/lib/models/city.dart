import 'package:decimal/decimal.dart';

class City {
  City({
    required this.createdDate,
    required this.id,
    required this.latitude,
    required this.longitude,
    required this.modifiedDate,
    required this.name,
  });
  String createdDate;
  String id;
  double latitude;
  double longitude;
  String modifiedDate;
  String name;

  factory City.fromJson(Map<String, dynamic> json) {
    return City(
      createdDate: json['createdDate'],
      id: json['id'],
      latitude: json['latitude'],
      longitude: json['longitude'],
      modifiedDate: json['modifiedDate'],
      name: json['name'],
    );
  }
}

// [
//     "city": {
//       "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "createdDate": "2022-06-15T09:46:38.992Z",
//       "modifiedDate": "2022-06-15T09:46:38.992Z",
//       "name": "string",
//       "latitude": 0,
//       "longitude": 0
//     },
//     "tripUsers": [
//       {
//         "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "createdDate": "2022-06-15T09:46:38.992Z",
//         "modifiedDate": "2022-06-15T09:46:38.992Z",
//         "tripId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//         "trip": "string",
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

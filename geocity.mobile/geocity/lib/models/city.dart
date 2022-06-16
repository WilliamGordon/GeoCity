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

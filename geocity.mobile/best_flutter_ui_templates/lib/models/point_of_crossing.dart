import 'dart:convert';

List<PointOfCrossing> PointOfCrossingFromJson(String str) =>
    List<PointOfCrossing>.from(
        json.decode(str).map((x) => PointOfCrossing.fromJson(x)));
String PointOfCrossingToJson(List<PointOfCrossing> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class PointOfCrossing {
  PointOfCrossing({
    required this.id,
    required this.createdDate,
    required this.modifiedDate,
    this.description,
    required this.latitude,
    required this.longitude,
    required this.position,
  });
  String id;
  String createdDate;
  String modifiedDate;
  String? description;
  num latitude;
  num longitude;
  num position;

  factory PointOfCrossing.fromJson(Map<String, dynamic> json) =>
      PointOfCrossing(
        id: json["id"],
        createdDate: json["createdDate"],
        modifiedDate: json["modifiedDate"],
        description: json["description"],
        latitude: json["latitude"],
        longitude: json["longitude"],
        position: json["position"],
      );
  Map<String, dynamic> toJson() => {
        "id": id,
        "createdDate": createdDate,
        "modifiedDate": modifiedDate,
        "description": description,
        "latitude": latitude,
        "longitude": longitude,
        "position": position,
      };
}

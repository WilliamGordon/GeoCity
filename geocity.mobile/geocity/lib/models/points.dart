import 'package:decimal/decimal.dart';
import 'package:geocity/models/point_of_crossing.dart';
import 'package:geocity/models/point_of_interest.dart';

class Points {
  Points({
    required this.pointOfInterests,
    required this.pointOfCrossings,
  });
  List<PointOfInterest> pointOfInterests;
  List<PointOfCrossing> pointOfCrossings;

  factory Points.fromJson(Map<String, dynamic> json) {
    var listPOI = json["itinaryPointOfInterest"] as List;
    var listPOC = json["itinaryPointOfCrossing"] as List;
    List<PointOfInterest> poiList =
        listPOI.map((i) => PointOfInterest.fromJson(i)).toList();
    List<PointOfCrossing> pocList =
        listPOC.map((i) => PointOfCrossing.fromJson(i)).toList();

    return Points(
      pointOfInterests: poiList,
      pointOfCrossings: pocList,
    );
  }
}

import 'package:decimal/decimal.dart';

class TripUserFavorite {
  TripUserFavorite({
    required this.id,
    required this.userId,
    required this.tripId,
  });
  String id;
  String userId;
  String tripId;

  factory TripUserFavorite.fromJson(Map<String, dynamic> json) {
    return TripUserFavorite(
      id: json['id'],
      userId: json['userId'],
      tripId: json['tripId'],
    );
  }
}

import 'dart:convert';
import 'package:geocity/models/itinary.dart';
import 'package:geocity/models/points.dart';
import 'package:geocity/models/trip_user_favorite.dart';
import 'package:geocity/models/trip.dart';
import 'package:geocity/models/trip_overview.dart';
import 'package:http/http.dart';

class HttpService {
  final String baseUrl = "https://localhost:44396/api";
  Future<List<TripOverview>> getTripOverviews(String searchWord) async {
    Response res = await get(Uri.parse('$baseUrl/trip/search=$searchWord'));
    if (res.statusCode == 200) {
      List<dynamic> body = jsonDecode(res.body);
      List<TripOverview> posts = body
          .map(
            (dynamic item) => TripOverview.fromJson(item),
          )
          .toList();
      return posts;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }

  Future<List<TripOverview>> fetchMyTrips(String userId) async {
    Response res = await get(Uri.parse('$baseUrl/trip/GetMyTrip/auth0|608e980d95657a0069252b8d'));
    if (res.statusCode == 200) {
      List<dynamic> body = jsonDecode(res.body);
      List<TripOverview> posts = body
          .map(
            (dynamic item) => TripOverview.fromJson(item),
          )
          .toList();
      return posts;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }

  Future<List<TripOverview>> fetchTripFavorite(String userId) async {
    userId = "auth0|608e980d95657a0069252b8d";
    Response res = await get(Uri.parse('$baseUrl/trip/GetFavoriteTrip/$userId'));
    if (res.statusCode == 200) {
      List<dynamic> body = jsonDecode(res.body);
      List<TripOverview> posts = body
          .map(
            (dynamic item) => TripOverview.fromJson(item),
          )
          .toList();
      return posts;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }

  Future<TripUserFavorite> fetchTripFavoriteForTrip(String? tripId, String? userId) async {
    userId = "auth0|608e980d95657a0069252b8d";
    Response res = await get(Uri.parse('$baseUrl/TripUserFavorite/$tripId/$userId'));
    if (res.statusCode == 200) {
      dynamic body = jsonDecode(res.body);
      TripUserFavorite posts = TripUserFavorite.fromJson(body);
      return posts;
    } else {
      // throw "Unable to retrieve posts. " + res.statusCode.toString();
      return new TripUserFavorite(id: "", userId: "", tripId: "");
    }
  }

  Future<String> AddTripToFavorite(String tripId, String userId) async {
    userId = "auth0|608e980d95657a0069252b8d";
    final uri = Uri.parse('$baseUrl/TripUserFavorite');
    final headers = {'Content-Type': 'application/json'};
    Map<String, String> body = {'userId': userId, 'tripId': tripId};
    String jsonBody = json.encode(body);
    final encoding = Encoding.getByName('utf-8');

    Response res = await post(
      uri,
      headers: headers,
      body: jsonBody,
      encoding: encoding,
    );

    if (res.statusCode == 200) {
      return res.body;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }

  Future<bool> RemoveTripFromFavorite(String tripId) async {
    Response res = await delete(Uri.parse('$baseUrl/TripUserFavorite/$tripId'));
    if (res.statusCode == 200) {
      return true;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }

  Future<Trip> fetchTrip(String? id) async {
    Response res = await get(Uri.parse('$baseUrl/trip/$id'));
    if (res.statusCode == 200) {
      dynamic body = jsonDecode(res.body);
      Trip trip = Trip.fromJson(body);
      return trip;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }

  Future<Itinary> fetchItinary(String id) async {
    Response res = await get(Uri.parse('$baseUrl/itinary/$id'));
    if (res.statusCode == 200) {
      dynamic body = jsonDecode(res.body);
      Itinary itinary = Itinary.fromJson(body);
      return itinary;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }

  Future<Points> fetchPoints(String id) async {
    Response res = await get(Uri.parse('$baseUrl/itinary/$id'));
    if (res.statusCode == 200) {
      dynamic body = jsonDecode(res.body);
      Itinary itinary = Itinary.fromJson(body);
      Points points = Points(pointOfInterests: itinary.pointOfInterests, pointOfCrossings: itinary.pointOfCrossings);
      return points;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }
}

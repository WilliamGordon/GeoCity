import 'dart:convert';
import 'package:geocity/models/trip_overview.dart';
import 'package:http/http.dart';
import '../models/itinary.dart';
import '../models/points.dart';
import '../models/trip.dart';
import '../models/user.dart';

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

  Future<Trip> fetchTrip(String id) async {
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
      Points points = Points(
          pointOfInterests: itinary.pointOfInterests,
          pointOfCrossings: itinary.pointOfCrossings);
      return points;
    } else {
      throw "Unable to retrieve posts. " + res.statusCode.toString();
    }
  }
}

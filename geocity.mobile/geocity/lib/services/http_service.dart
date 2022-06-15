import 'dart:convert';
import 'package:geocity/models/trip_overview.dart';
import 'package:http/http.dart';
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
}

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const AUTH0_DOMAIN = 'dev-ls7u7q-d.eu.auth0.com';
const AUTH0_CLIENT_ID = 'uocBA5DDCcGWaJiImeJcDXcDBH1kSaKB';
const AUTH0_REDIRECT_URI = 'com.auth0.geocity://login-callback';
const AUTH0_ISSUER = 'https://$AUTH0_DOMAIN';

class AuthService {
  static final AuthService instance = AuthService._internal();
  factory AuthService() => instance;
  AuthService._internal();

  final FlutterAppAuth appAuth = const FlutterAppAuth();
  final FlutterSecureStorage secureStorage = const FlutterSecureStorage();

  Future<void> loginAction() async {
    try {
      final AuthorizationTokenResponse? result =
          await appAuth.authorizeAndExchangeCode(
        AuthorizationTokenRequest(
          AUTH0_CLIENT_ID,
          AUTH0_REDIRECT_URI,
          issuer: 'https://$AUTH0_DOMAIN',
          scopes: ['openid', 'profile', 'offline_access', 'email'],
          promptValues: ['login'],
        ),
      );

      final token = parseIdToken(result!.idToken);
      await secureStorage.write(
          key: 'refresh_token', value: result.refreshToken);
    } catch (e, s) {}
  }

  void logoutAction() async {
    await secureStorage.delete(key: 'refresh_token');
  }

  Map<String, dynamic> parseIdToken(String? idToken) {
    final parts = idToken!.split(r'.');
    return jsonDecode(
        utf8.decode(base64Url.decode(base64Url.normalize(parts[1]))));
  }
}

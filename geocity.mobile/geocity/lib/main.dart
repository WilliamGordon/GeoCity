import 'package:flutter/material.dart';

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'navigation_drawer.dart';

/// -----------------------------------
///           Auth0 Variables
/// -----------------------------------

const AUTH0_DOMAIN = 'dev-ls7u7q-d.eu.auth0.com';
const AUTH0_CLIENT_ID = 'uocBA5DDCcGWaJiImeJcDXcDBH1kSaKB';
const AUTH0_REDIRECT_URI = 'com.auth0.geocity://login-callback';
const AUTH0_ISSUER = 'https://$AUTH0_DOMAIN';

// instantiate appAuth
final FlutterAppAuth appAuth = FlutterAppAuth();
// instantiate secure storage
final FlutterSecureStorage secureStorage = const FlutterSecureStorage();
// login
bool isLogged = false;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Geocity',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Geocity'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String loginResult = '';
  String loginName = '';
  String accessToken = '';
  String apiResponse = '';

  @override
  initState() {
    loginFromToken();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: NavigationDrawerNew(),
        appBar: AppBar(
          title: const Text('Geocity'),
          centerTitle: true,
          backgroundColor: const Color.fromARGB(255, 16, 55, 122),
        ),
        body: Builder(builder: (context) {
          return Center(
              child: Container(
            height: double.infinity,
            width: double.infinity,
            decoration: const BoxDecoration(
                image: DecorationImage(
                    image: AssetImage("assets/images/ny.jpg"),
                    fit: BoxFit.cover)),
          ));
        }));
  }

  Future<void> loginAction() async {
    setState(() {
      loginName = '';
      loginResult = '';
      accessToken = '';
    });
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
      setState(() {
        isLogged = true;
        loginName = token['name'];
        loginResult = 'Auth with auth0 success';
        accessToken = result.accessToken!;
        // for(String k in token.keys) {
        //   loginResult += '\n$k = ${token[k]}';
        // }
      });
    } catch (e, s) {
      setState(() {
        isLogged = false;
        loginResult = 'Auth failed : $e';
      });
    }
  }

  void logoutAction() async {
    await secureStorage.delete(key: 'refresh_token');
    setState(() {
      loginName = '';
      loginResult = '';
      isLogged = false;
    });
  }

  void loginFromToken() async {
    final storedRefreshToken = await secureStorage.read(key: 'refresh_token');
    if (storedRefreshToken == null) return;
    setState(() {
      isLogged = true;
    });
    try {
      final response = await appAuth.token(TokenRequest(
        AUTH0_CLIENT_ID,
        AUTH0_REDIRECT_URI,
        issuer: AUTH0_ISSUER,
        refreshToken: storedRefreshToken,
      ));
      final token = parseIdToken(response!.idToken);
      secureStorage.write(key: 'refresh_token', value: response.refreshToken);
      setState(() {
        isLogged = true;
        loginName = token['name'];
        loginResult = 'Auth with auth0 success';
      });
    } catch (e, s) {
      logoutAction();
    }
  }
}

Map<String, dynamic> parseIdToken(String? idToken) {
  final parts = idToken!.split(r'.');
  return jsonDecode(
      utf8.decode(base64Url.decode(base64Url.normalize(parts[1]))));
}

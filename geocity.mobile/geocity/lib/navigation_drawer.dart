import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:geocity/pages/account.dart';
import 'package:geocity/pages/explore.dart';
import 'package:geocity/pages/favorites.dart';
import 'package:geocity/pages/trip.dart';
import 'package:geocity/pages/trips.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_appauth/flutter_appauth.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'drawer_item.dart';
import 'main.dart';

const AUTH0_DOMAIN = 'dev-ls7u7q-d.eu.auth0.com';
const AUTH0_CLIENT_ID = 'uocBA5DDCcGWaJiImeJcDXcDBH1kSaKB';
const AUTH0_REDIRECT_URI = 'com.auth0.geocity://login-callback';
const AUTH0_ISSUER = 'https://$AUTH0_DOMAIN';

bool isLogged = false;

class NavigationDrawerNew extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _NavigationDrawerNew();
  }
}

class _NavigationDrawerNew extends State<NavigationDrawerNew> {
  String loginResult = '';
  String loginName = '';
  String userEmail = '';
  String userId = '';
  String accessToken = '';
  String apiResponse = '';

  @override
  initState() {
    loginFromToken();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Material(
        color: Color.fromARGB(255, 16, 55, 122),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24.0, 80, 24, 0),
          child: Column(
            children: [
              if (isLogged)
                Row(
                  children: [
                    const CircleAvatar(
                      radius: 40,
                      backgroundImage: NetworkImage(
                          'https://i.pinimg.com/564x/f0/a0/30/f0a030a687f387f5b36d4828fade251e.jpg'),
                    ),
                    const SizedBox(
                      width: 20,
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(loginName,
                            style:
                                TextStyle(fontSize: 14, color: Colors.white)),
                        SizedBox(
                          height: 10,
                        ),
                        Text(userId,
                            style: TextStyle(fontSize: 14, color: Colors.white))
                      ],
                    )
                  ],
                ),
              if (isLogged)
                const SizedBox(
                  height: 40,
                ),
              const Divider(
                thickness: 1,
                height: 10,
                color: Colors.grey,
              ),
              const SizedBox(
                height: 40,
              ),
              DrawerItem(
                name: 'Explore',
                icon: Icons.explore,
                onPressed: () =>
                    onItemPressed(context, index: 0, userId: userId),
              ),
              const SizedBox(
                height: 30,
              ),
              if (isLogged)
                DrawerItem(
                  name: 'My Trips',
                  icon: Icons.people,
                  onPressed: () =>
                      onItemPressed(context, index: 1, userId: userId),
                ),
              if (isLogged)
                const SizedBox(
                  height: 30,
                ),
              if (isLogged)
                DrawerItem(
                    name: 'Favourites',
                    icon: Icons.favorite_outline,
                    onPressed: () =>
                        onItemPressed(context, index: 2, userId: userId)),
              if (isLogged)
                const SizedBox(
                  height: 30,
                ),
              const Divider(
                thickness: 1,
                height: 10,
                color: Colors.grey,
              ),
              const SizedBox(
                height: 30,
              ),
              if (isLogged)
                DrawerItem(
                    name: 'Log out',
                    icon: Icons.logout,
                    onPressed: logoutAction),
              if (isLogged)
                const SizedBox(
                  height: 30,
                ),
              if (!isLogged)
                DrawerItem(
                    name: 'Log In', icon: Icons.login, onPressed: loginAction),
              if (!isLogged)
                const SizedBox(
                  height: 30,
                ),
              DrawerItem(
                  name: 'Test Trip',
                  icon: Icons.explore,
                  onPressed: () => onItemPressed(context, index: 6)),
            ],
          ),
        ),
      ),
    );
  }

  void onItemPressed(BuildContext context,
      {required int index, String? userId}) {
    Navigator.pop(context);

    switch (index) {
      case 0:
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => Explore()));
        break;
      case 1:
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => Trips()));
        break;
      case 2:
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => const Favorites()));
        break;
      case 6:
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => const Trip()));
    }
  }

  Future<void> loginAction() async {
    setState(() {
      loginName = '';
      userEmail = '';
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
        userId = token['sub'];
        loginResult = 'Auth with auth0 success';
        accessToken = result.accessToken!;
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
      userEmail = '';
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
        userId = token['sub'];
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

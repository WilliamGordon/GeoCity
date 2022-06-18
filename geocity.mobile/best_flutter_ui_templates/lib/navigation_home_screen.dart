import 'package:geocity/views/theme/app_theme.dart';
import 'package:geocity/custom_drawer/drawer_user_controller.dart';
import 'package:geocity/custom_drawer/home_drawer.dart';
import 'package:geocity/views/start_screen.dart';
import 'package:geocity/views/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:geocity/views/trip_favorite_screen.dart';
import 'package:geocity/views/trip_participant_screen.dart';

class NavigationHomeScreen extends StatefulWidget {
  @override
  _NavigationHomeScreenState createState() => _NavigationHomeScreenState();
}

class _NavigationHomeScreenState extends State<NavigationHomeScreen> {
  Widget? screenView;
  DrawerIndex? drawerIndex;

  @override
  void initState() {
    drawerIndex = DrawerIndex.HOME;
    screenView = const MyHomePage();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppTheme.nearlyWhite,
      child: SafeArea(
        top: false,
        bottom: false,
        child: Scaffold(
          backgroundColor: AppTheme.nearlyWhite,
          body: DrawerUserController(
            screenIndex: drawerIndex,
            drawerWidth: MediaQuery.of(context).size.width * 0.75,
            onDrawerCall: (DrawerIndex drawerIndexdata) {
              changeIndex(drawerIndexdata);
              print(drawerIndexdata);
              //callback from drawer for replace screen as user need with passing DrawerIndex(Enum index)
            },
            screenView: screenView,
            //we replace screen view as we need on navigate starting screens like MyHomePage, HelpScreen, FeedbackScreen, etc...
          ),
        ),
      ),
    );
  }

  void changeIndex(DrawerIndex drawerIndexdata) {
    if (drawerIndex != drawerIndexdata) {
      print(drawerIndex);
      drawerIndex = drawerIndexdata;
      switch (drawerIndex) {
        case DrawerIndex.HOME:
          setState(() {
            screenView = const MyHomePage();
          });
          break;
        case DrawerIndex.Help:
          setState(() {
            screenView = TripParticipantScreen();
          });
          break;
        case DrawerIndex.FeedBack:
          setState(() {
            screenView = TripFavoriteScreen();
          });
          break;
        case DrawerIndex.Invite:
          setState(() {
            // screenView = InviteFriend();
          });
          break;
        default:
          break;
      }
    }
  }
}

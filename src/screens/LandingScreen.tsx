import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

interface LandingScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

type ActivityType = 'travel' | 'events' | 'learning' | 'hangout';

interface ActivityInfo {
  key: ActivityType;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  previewTitle: string;
  previewDesc: string;
  previewIcon: keyof typeof Ionicons.glyphMap;
}

const ACTIVITIES: ActivityInfo[] = [
  {
    key: 'travel',
    label: 'Travel',
    iconName: 'airplane-outline',
    previewTitle: 'Hidden Gems & City Walks',
    previewDesc: 'Over 310 local companions ready to explore with you',
    previewIcon: 'compass-outline',
  },
  {
    key: 'events',
    label: 'Events',
    iconName: 'ticket-outline',
    previewTitle: 'Live Gigs & Concerts',
    previewDesc: 'Over 420 friendly guides attending shows this weekend',
    previewIcon: 'sparkles-outline',
  },
  {
    key: 'learning',
    label: 'Learning',
    iconName: 'book-outline',
    previewTitle: 'Skill & Language Practice',
    previewDesc: 'Over 250 verified partners for study & talks',
    previewIcon: 'school-outline',
  },
  {
    key: 'hangout',
    label: 'Hangout',
    iconName: 'cafe-outline',
    previewTitle: 'Coffee & Real Conversations',
    previewDesc: 'Over 580 companions ready for warm, genuine chats',
    previewIcon: 'chatbubbles-outline',
  },
];

export default function LandingScreen({ onGetStarted, onLogin }: LandingScreenProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType>('events');

  const activeActivity = ACTIVITIES.find((a) => a.key === selectedActivity) || ACTIVITIES[1];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />

          {/* Verified Badge */}
          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={13} color="#0D7A3E" style={styles.shieldIcon} />
            <Text style={styles.verifiedBadgeText}>VERIFIED & SAFE COMPANIONS</Text>
          </View>

          {/* Headline */}
          <View style={styles.headlineWrapper}>
            <Text style={styles.headline}>Whatever you love doing,</Text>
            <View style={styles.highlightRow}>
              <Text style={styles.headlineHighlight}>never go alone.</Text>
              <View style={styles.brushUnderline} />
            </View>
          </View>

          {/* Subtitle */}
          <Text className='text-red-600 bg-green-600'>
            From coffee chats and live gigs to city walks and deep conversations — book verified, friendly people who are truly available.
          </Text>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCardContainer}>
          <View style={styles.heroCard}>
            <Image
              source={require('../../assets/images/hero-community.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />

            {/* Top Right "Active Now" Badge */}
            <View style={styles.activeNowBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeNowText}>Active Now</Text>
            </View>

            {/* Gradient Scrim */}
            <View style={styles.darkGradientScrim} />

            {/* Floating Overlay Pills */}
            <View style={styles.heroOverlayPillsRow}>
              {/* Left Pill: Avatars + Journeys */}
              <View style={styles.overlayPill}>
                <View style={styles.avatarStack}>
                  <View style={[styles.avatarCircle, { backgroundColor: '#FCD34D' }]}>
                    <Text style={styles.avatarInitial}>AI</Text>
                  </View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#FCA5A5', marginLeft: -8 }]}>
                    <Text style={styles.avatarInitial}>M</Text>
                  </View>
                  <View style={[styles.avatarCircle, { backgroundColor: '#6EE7B7', marginLeft: -8 }]}>
                    <Text style={styles.avatarInitial}>SL</Text>
                  </View>
                </View>
                <Ionicons name="heart" size={13} color="#E11D48" style={styles.heartIcon} />
                <Text style={styles.overlayPillText}>10,000+ Journeys</Text>
              </View>

              {/* Right Pill: Near You */}
              <View style={styles.overlayPill}>
                <Feather name="navigation" size={13} color="#A84218" style={styles.nearIcon} />
                <Text style={styles.overlayPillText}>Near You</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Explore By Activity Section */}
        <View style={styles.activitySection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>EXPLORE BY ACTIVITY</Text>
            <TouchableOpacity style={styles.previewToggle} activeOpacity={0.7}>
              <Text style={styles.previewToggleText}>Tap to preview ⇅</Text>
            </TouchableOpacity>
          </View>

          {/* 4 Activity Tabs */}
          <View style={styles.activityTabsRow}>
            {ACTIVITIES.map((item) => {
              const isSelected = item.key === selectedActivity;
              return (
                <TouchableOpacity
                  key={item.key}
                  style={[styles.activityTab, isSelected && styles.activityTabSelected]}
                  onPress={() => setSelectedActivity(item.key)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.tabIconContainer, isSelected && styles.tabIconContainerSelected]}>
                    <Ionicons
                      name={item.iconName}
                      size={18}
                      color={isSelected ? '#FFFFFF' : '#A84218'}
                    />
                  </View>
                  <Text style={[styles.tabLabel, isSelected && styles.tabLabelSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Dynamic Preview Banner */}
          <View style={styles.previewBanner}>
            <View style={styles.bannerIconBadge}>
              <Ionicons name={activeActivity.previewIcon} size={17} color="#A84218" />
            </View>
            <View style={styles.bannerTextCol}>
              <Text style={styles.bannerTitle}>{activeActivity.previewTitle}</Text>
              <View style={styles.bannerDescRow}>
                <Text style={styles.bannerDesc}>{activeActivity.previewDesc}</Text>
                <TouchableOpacity style={styles.exploreLinkRow} activeOpacity={0.7} onPress={onGetStarted}>
                  <Text style={styles.exploreLink}>Explore</Text>
                  <Ionicons name="arrow-forward" size={12} color="#A84218" style={styles.exploreArrow} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Safety & Trust Pillars */}
        <View style={styles.pillarsSection}>
          <View style={styles.pillarCard}>
            <View style={styles.pillarIconBadge}>
              <Ionicons name="shield-outline" size={17} color="#A84218" />
            </View>
            <Text style={styles.pillarTitle}>ID Vetted</Text>
            <Text style={styles.pillarSubtitle}>Govt. Verified</Text>
          </View>

          <View style={styles.pillarCard}>
            <View style={styles.pillarIconBadge}>
              <MaterialCommunityIcons name="handshake-outline" size={17} color="#A84218" />
            </View>
            <Text style={styles.pillarTitle}>Code of Care</Text>
            <Text style={styles.pillarSubtitle}>Zero tolerance</Text>
          </View>

          <View style={styles.pillarCard}>
            <View style={styles.pillarIconBadge}>
              <Ionicons name="flash-outline" size={17} color="#A84218" />
            </View>
            <Text style={styles.pillarTitle}>Flexible</Text>
            <Text style={styles.pillarSubtitle}>Instant Match</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onGetStarted}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Find Your Companion</Text>
            <Ionicons name="arrow-forward" size={17} color="#FFFFFF" style={styles.buttonArrow} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>I Already Have an Account</Text>
          </TouchableOpacity>

          {/* Footer Security Note */}
          <View style={styles.footerNoteRow}>
            <Ionicons name="lock-closed" size={12} color="#0D7A3E" style={styles.lockIcon} />
            <Text style={styles.footerNoteText}>
              100% ID Verified & Encrypted • Public Venues Only
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Home Indicator Bar (iOS only) */}
      {Platform.OS === 'ios' && (
        <View style={styles.homeIndicatorWrapper}>
          <View style={styles.homeIndicator} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDF8F5',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FDF8F5',
  },
  scrollContent: {
    paddingBottom: 40,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight || 36) + 16 : 14,
    paddingBottom: 10,
  },
  logoImage: {
    width: 130,
    height: 105,
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F6ED',
    borderColor: '#C6E8D2',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 11,
    marginBottom: 10,
  },
  shieldIcon: {
    marginRight: 5,
  },
  verifiedBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0D7A3E',
    letterSpacing: 0.8,
  },
  headlineWrapper: {
    alignItems: 'center',
    marginBottom: 8,
  },
  headline: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E1612',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  highlightRow: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 2,
  },
  headlineHighlight: {
    fontSize: 24,
    fontWeight: '800',
    color: '#A84218',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  brushUnderline: {
    position: 'absolute',
    bottom: -2.5,
    height: 3,
    width: '94%',
    backgroundColor: '#A84218',
    borderRadius: 2,
    opacity: 0.85,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18.5,
    color: '#66574F',
    textAlign: 'center',
    paddingHorizontal: 12,
    maxWidth: 340,
  },
  heroCardContainer: {
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  heroCard: {
    height: 185,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#EBE2DC',
    ...Platform.select({
      ios: {
        shadowColor: '#2B170E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 4px 14px rgba(43, 23, 14, 0.10)',
      },
    }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  activeNowBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingVertical: 4.5,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#16A34A',
    marginRight: 5,
  },
  activeNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1E1612',
  },
  darkGradientScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: 'rgba(28, 18, 13, 0.42)',
  },
  heroOverlayPillsRow: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlayPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(240, 230, 222, 0.9)',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  avatarCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarInitial: {
    fontSize: 8,
    fontWeight: '800',
    color: '#33231B',
  },
  heartIcon: {
    marginRight: 4,
  },
  nearIcon: {
    marginRight: 4,
    transform: [{ rotate: '45deg' }],
  },
  overlayPillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1E1612',
  },
  activitySection: {
    paddingHorizontal: 16,
    marginBottom: 13,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeaderTitle: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#76675E',
    letterSpacing: 0.8,
  },
  previewToggle: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  previewToggleText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#A84218',
  },
  activityTabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  activityTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginHorizontal: 3,
  },
  activityTabSelected: {
    borderColor: '#A84218',
    backgroundColor: '#FFF8F4',
    borderWidth: 1.5,
  },
  tabIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FDF2EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tabIconContainerSelected: {
    backgroundColor: '#A84218',
  },
  tabLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#4B3A32',
  },
  tabLabelSelected: {
    color: '#A84218',
    fontWeight: '800',
  },
  previewBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F2ED',
    borderWidth: 1,
    borderColor: '#EFE2D9',
    borderRadius: 16,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  bannerIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7E3D7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#261913',
    marginBottom: 1.5,
  },
  bannerDescRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  bannerDesc: {
    fontSize: 11,
    color: '#6F5E56',
    marginRight: 6,
  },
  exploreLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreLink: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A84218',
    marginRight: 2,
  },
  exploreArrow: {
    marginTop: 1,
  },
  pillarsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  pillarCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    borderRadius: 15,
    paddingVertical: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  pillarIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FDF1EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  pillarTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#211611',
    marginBottom: 1,
    textAlign: 'center',
  },
  pillarSubtitle: {
    fontSize: 9.5,
    fontWeight: '500',
    color: '#76675E',
    textAlign: 'center',
  },
  actionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#A84218',
    height: 48,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
    shadowColor: '#A84218',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
    marginRight: 6,
  },
  buttonArrow: {
    marginTop: 1,
  },
  secondaryButton: {
    backgroundColor: '#F4ECE7',
    height: 46,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EFE3DC',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D1F17',
  },
  footerNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  lockIcon: {
    marginRight: 5,
  },
  footerNoteText: {
    fontSize: 10.5,

    fontWeight: '600',
    color: '#55695C',
    textAlign: 'center',
  },
  homeIndicatorWrapper: {
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 4,
    backgroundColor: '#FDF8F5',
  },
  homeIndicator: {
    width: 134,
    height: 4.5,
    borderRadius: 3,
    backgroundColor: '#D1C2BA',
  },
});

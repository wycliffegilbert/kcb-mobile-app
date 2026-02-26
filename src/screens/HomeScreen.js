import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../data/theme';
import {
  USER, ACCOUNTS, TRANSACTIONS, INCOME_THIS_MONTH,
  EXPENSES_THIS_MONTH, formatCurrency,
} from '../data/dummyData';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const recentTx = TRANSACTIONS.slice(0, 5);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning 🌅';
    if (hour < 17) return 'Good afternoon ☀️';
    if (hour < 21) return 'Good evening 🌆';
    return 'Good night 🌙';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* TOP BAR */}
      <View style={styles.topBar}>
        <View style={styles.topLeft}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>KCB</Text>
          </View>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>{USER.firstName}</Text>
          </View>
        </View>
        <View style={styles.topRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, styles.notifBtn]}>
            <Ionicons name="notifications-outline" size={20} color="#fff" />
            <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroInner}>
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroAccLabel}>Total Balance</Text>
                <View style={styles.heroBalanceRow}>
                  <Text style={styles.heroBalance}>
                    {balanceVisible ? formatCurrency(ACCOUNTS.checking.balance) : 'KES ••••••'}
                  </Text>
                  <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)} style={styles.eyeBtn}>
                    <Ionicons
                      name={balanceVisible ? 'eye-outline' : 'eye-off-outline'}
                      size={20} color="rgba(255,255,255,0.7)"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>Checking</Text>
              </View>
            </View>
            <Text style={styles.heroAccNumber}>{ACCOUNTS.checking.number}</Text>

            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <View style={styles.heroStatLabel}>
                  <Ionicons name="arrow-down-circle" size={14} color="#22d3a0" />
                  <Text style={styles.heroStatLabelText}>Income</Text>
                </View>
                <Text style={styles.heroStatValue}>
                  {balanceVisible ? formatCurrency(INCOME_THIS_MONTH) : '••••••'}
                </Text>
              </View>
              <View style={styles.heroDivider} />
              <View style={styles.heroStat}>
                <View style={styles.heroStatLabel}>
                  <Ionicons name="arrow-up-circle" size={14} color="#f76f6f" />
                  <Text style={styles.heroStatLabelText}>Expenses</Text>
                </View>
                <Text style={styles.heroStatValue}>
                  {balanceVisible ? formatCurrency(EXPENSES_THIS_MONTH) : '••••••'}
                </Text>
              </View>
            </View>
          </View>
          {/* Decorative circles */}
          <View style={styles.decCircle1} />
          <View style={styles.decCircle2} />
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.quickActions}>
          {[
            { icon: 'send', label: 'Transfer', screen: 'Transactions' },
            { icon: 'download', label: 'Receive', screen: 'Transactions' },
            { icon: 'card', label: 'Pay Bills', screen: 'Transactions' },
            { icon: 'wallet', label: 'Top Up', screen: 'Transactions' },
            { icon: 'bar-chart', label: 'Invest', screen: 'Accounts' },
            { icon: 'shield-checkmark', label: 'Insure', screen: 'Accounts' },
            { icon: 'cash', label: 'Loans', screen: 'Accounts' },
            { icon: 'grid', label: 'More', screen: 'Profile' },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.qaBtn}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.qaIcon}>
                <Ionicons name={`${item.icon}-outline`} size={22} color={COLORS.primary} />
              </View>
              <Text style={styles.qaLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RECENT TRANSACTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.txCard}>
          {recentTx.map((tx, i) => (
            <View key={tx.id} style={[styles.txItem, i < recentTx.length - 1 && styles.txBorder]}>
              <View style={[styles.txIcon, { backgroundColor: tx.color + '20' }]}>
                <Text style={styles.txEmoji}>{tx.icon}</Text>
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txName}>{tx.name}</Text>
                <Text style={styles.txDate}>{tx.displayDate}</Text>
              </View>
              <Text style={[
                styles.txAmount,
                tx.type === 'income' ? styles.amountIn : styles.amountOut
              ]}>
                {tx.type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(tx.amount))}
              </Text>
            </View>
          ))}
        </View>

        {/* PROMO BANNER */}
        <View style={styles.promoBanner}>
          <View>
            <Text style={styles.promoTitle}>KCB M-Pesa Loan</Text>
            <Text style={styles.promoSub}>Get up to KES 1,000,000 instantly</Text>
            <TouchableOpacity style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.promoEmoji}>🏦</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.primary, paddingHorizontal: SPACING.base,
    paddingTop: 50, paddingBottom: SPACING.lg,
  },
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { color: COLORS.primary, fontWeight: '900', fontSize: 13, letterSpacing: 0.5 },
  greeting: { color: 'rgba(255,255,255,0.65)', fontSize: 12, marginBottom: 2 },
  userName: { color: '#fff', fontWeight: '800', fontSize: 16 },
  topRight: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  notifBtn: { position: 'relative' },
  badge: {
    position: 'absolute', top: -3, right: -3,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: COLORS.gold, alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#000', fontSize: 9, fontWeight: '900' },

  heroCard: {
    marginHorizontal: SPACING.base, marginTop: SPACING.base,
    borderRadius: RADIUS.xl, overflow: 'hidden',
    backgroundColor: COLORS.primary, ...SHADOWS.lg,
    marginBottom: SPACING.base,
  },
  heroInner: { padding: SPACING.lg, zIndex: 2 },
  heroTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  heroAccLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  heroBalanceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroBalance: { color: '#fff', fontSize: 28, fontWeight: '900', letterSpacing: -0.5 },
  eyeBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8,
    padding: 4,
  },
  heroPill: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
  },
  heroPillText: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '700' },
  heroAccNumber: { color: 'rgba(255,255,255,0.4)', fontSize: 13, letterSpacing: 2, marginBottom: 20 },
  heroStats: {
    flexDirection: 'row', borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)', paddingTop: 16,
  },
  heroStat: { flex: 1 },
  heroDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.12)', marginHorizontal: 16 },
  heroStatLabel: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  heroStatLabelText: { color: 'rgba(255,255,255,0.55)', fontSize: 11 },
  heroStatValue: { color: '#fff', fontSize: 15, fontWeight: '800' },
  decCircle1: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.04)', top: -60, right: -60,
  },
  decCircle2: {
    position: 'absolute', width: 150, height: 150, borderRadius: 75,
    backgroundColor: 'rgba(212,175,55,0.07)', bottom: -60, left: -30,
  },

  quickActions: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: SPACING.base, marginBottom: SPACING.base,
    gap: 8,
  },
  qaBtn: { width: (width - 32 - 24) / 4, alignItems: 'center', gap: 7 },
  qaIcon: {
    width: 58, height: 58, borderRadius: 18,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    ...SHADOWS.sm, borderWidth: 1, borderColor: COLORS.border,
  },
  qaLabel: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '600', textAlign: 'center' },

  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.base, marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  seeAll: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },

  txCard: {
    marginHorizontal: SPACING.base, backgroundColor: '#fff',
    borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOWS.sm,
    marginBottom: SPACING.base, borderWidth: 1, borderColor: COLORS.border,
  },
  txItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.base, gap: 12 },
  txBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  txIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  txEmoji: { fontSize: 20 },
  txInfo: { flex: 1 },
  txName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  txDate: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: '800' },
  amountIn: { color: COLORS.green },
  amountOut: { color: COLORS.red },

  promoBanner: {
    marginHorizontal: SPACING.base,
    backgroundColor: COLORS.primaryDark,
    borderRadius: RADIUS.lg, padding: SPACING.lg,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    ...SHADOWS.md, borderWidth: 1, borderColor: 'rgba(212,175,55,0.2)',
  },
  promoTitle: { color: '#fff', fontSize: 15, fontWeight: '800', marginBottom: 4 },
  promoSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 12 },
  promoBtn: {
    backgroundColor: COLORS.gold, borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 7, alignSelf: 'flex-start',
  },
  promoBtnText: { color: '#000', fontSize: 12, fontWeight: '800' },
  promoEmoji: { fontSize: 44 },
});

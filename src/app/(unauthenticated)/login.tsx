import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.logo}>Pixora</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.forgot}>Forgot password?</Text>

        {/* TEMPORARY: jumps to Home so you can preview the tabs. */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.or}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.row}>
          <Text style={styles.muted}>Don't have an account? </Text>
          <Link href="/register" style={styles.link}>
            Sign up
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 32,
  },
  logo: {
    color: Colors.text,
    fontFamily: Fonts.logo,
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: Colors.input,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 15,
  },
  forgot: {
    color: Colors.primary,
    textAlign: 'right',
    fontSize: 13,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  line: { flex: 1, height: 1, backgroundColor: Colors.border },
  or: { color: Colors.textMuted, marginHorizontal: 16, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'center' },
  muted: { color: Colors.textMuted },
  link: { color: Colors.primary, fontWeight: '700' },
});
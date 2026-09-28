import { Image, StyleSheet, View } from 'react-native';

const logo = require('../assets/logofont.png');

type BrandLogoProps = {
  compact?: boolean;
};

export function BrandLogo({ compact = false }: BrandLogoProps) {
  return (
    <View style={[styles.wrap, compact && styles.compactWrap]}>
      <Image
        source={logo}
        resizeMode="contain"
        style={[styles.logo, compact && styles.compact]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    height: 82,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  compactWrap: {
    height: 64,
  },
  logo: {
    height: 82,
    width: 246,
  },
  compact: {
    height: 66,
    width: 198,
  },
});

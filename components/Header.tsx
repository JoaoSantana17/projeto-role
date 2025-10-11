import { StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <View style={styles.header}>
      
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#210b34',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

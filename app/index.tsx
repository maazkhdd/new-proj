import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
  ImageProps,
  Modal,
  Button,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import PagerView from "react-native-pager-view";
import userData from "@/utils/userData";
import categoryData from "@/utils/categoryData";

// Define types for data
interface CarouselItem {
  id: number;
  worker_role: string;
  icon: any;
}

interface User {
  id: number;
  name: string;
  worker_role: string;
  country: string;
  profileImage: ImageProps["source"];
  countryFlag: string;
}

export default function CategoriesScreen() {
  const [selectedCarousel, setSelectedCarousel] =
    useState<string>("Astrologer");
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Update filtered data based on search
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text === "") {
      const selectedWorkerRole = getSelectedWorkerRoleData();
      setFilteredData(selectedWorkerRole);
    } else {
      const filtered = userData.filter(
        (user) =>
          user.name.toLowerCase().includes(text.toLowerCase()) &&
          user.worker_role
            .toLowerCase()
            .includes(selectedCarousel.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  // Render Carousel Items
  const renderCarouselItem: ListRenderItem<CarouselItem> = ({ item }) => (
    <View style={styles.carouselItem}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelectedCarousel(item.worker_role)}
        style={[
          styles.carouselIconContainer,
          {
            borderColor:
              selectedCarousel === item.worker_role ? "gray" : "transparent",
          },
        ]}
      >
        <Image style={[styles.carouselIcon]} source={item.icon} />
      </TouchableOpacity>
      <Text style={styles.carouselItemText}>{item.worker_role}</Text>
    </View>
  );

  // Handle User Press
  const handleUserPress = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // Render User Item
  const renderUserItem: ListRenderItem<User> = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => handleUserPress(item)}
      >
        <Image source={item.profileImage} style={styles.userImage} />
        <Image source={{ uri: item.countryFlag }} style={styles.countryFlag} />
        <Text style={styles.userName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const getSelectedWorkerRoleData = () =>
    userData.filter((user) => user.worker_role === selectedCarousel);

  useEffect(() => {
    const selectedWorkerRole = getSelectedWorkerRoleData();
    setFilteredData(selectedWorkerRole);
  }, [selectedCarousel]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Carousel */}
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        snapToInterval={118}
        style={styles.carouselContainer}
        data={categoryData}
        renderItem={renderCarouselItem}
      />

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
      />

      {/* User Grid List */}
      <FlatList
        data={filteredData}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text>No data found</Text>
            </View>
          );
        }}
      />

      {/* Modal to show user details */}
      {selectedUser && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={selectedUser.profileImage}
                style={styles.modalProfileImage}
              />
              <Text style={styles.modalTitle}>User Details</Text>
              <Text>Name: {selectedUser.name}</Text>
              <Text>Role: {selectedUser.worker_role}</Text>
              <Text style={{ marginBottom: 12 }}>
                Country: {selectedUser.country}
              </Text>
              <Button
                title="Close"
                color={"#000"}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  carouselContainer: {
    maxHeight: 120,
    paddingHorizontal: 10,
    minHeight: 120,
    marginBottom: 20,
    backgroundColor: "#F0EBE5",
  },
  carouselItem: {
    marginVertical: 13,
    marginRight: 12,

  },
  carouselIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 50,
    padding: 20,
    backgroundColor: "#fff",
  },
  carouselItemText: { fontSize: 10, textAlign: "center" },
  carouselIcon: {
    width: 60,
    height: 60,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 20,
    borderRadius: 10,
  },
  grid: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  userItem: {
    margin: 10,
    alignItems: "center",
    position: "relative",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  countryFlag: {
    width: 20,
    height: 20,
    borderRadius: 15,
    position: "absolute",
    top: 0,
    right: 0,
  },
  userName: {
    marginTop: 5,
    maxWidth: 60,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

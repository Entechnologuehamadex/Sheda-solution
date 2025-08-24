import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  useAuth,
  useProperties,
  useAppointments,
  usePayment,
  useSchedule,
  useContracts,
  useMedia,
  useChat,
  useOptimisticUpdate,
  usePagination,
  usePolling,
  useFormSubmit,
  useSearch,
  useFileUpload,
} from "../hooks/useShedaApi";
import { PropertyShow, AppointmentSchema } from "../services/api";

// Example Login Component
export function LoginExample() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError } = useAuth();

  useEffect(() => {
    if (error) {
      Alert.alert("Login Error", error);
      clearError();
    }
  }, [error, clearError]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    try {
      await login(username, password);
      Alert.alert("Success", "Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// Example Property List Component
export function PropertyListExample() {
  const { properties, getProperties, isLoading, error } = useProperties();

  useEffect(() => {
    getProperties(20, 1);
  }, [getProperties]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const renderProperty = ({ item }: { item: PropertyShow }) => (
    <View style={styles.propertyCard}>
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertyLocation}>{item.location}</Text>
      <Text style={styles.propertyPrice}>${item.price}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading properties...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Properties</Text>
      <FlatList
        data={properties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => getProperties(20, properties.length + 1)}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
}

// Example Appointment Booking Component
export function AppointmentBookingExample() {
  const { bookAppointment, isLoading } = useAppointments();
  const [agentId, setAgentId] = useState("");
  const [propertyId, setPropertyId] = useState("");

  const handleBookAppointment = async () => {
    if (!agentId || !propertyId) {
      Alert.alert("Error", "Please enter agent ID and property ID");
      return;
    }

    try {
      const appointmentData: AppointmentSchema = {
        agent_id: parseInt(agentId),
        property_id: parseInt(propertyId),
        requested_time: new Date().toISOString(),
      };

      await bookAppointment(appointmentData);
      Alert.alert("Success", "Appointment booked successfully!");
      setAgentId("");
      setPropertyId("");
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>
      <TextInput
        style={styles.input}
        placeholder="Agent ID"
        value={agentId}
        onChangeText={setAgentId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Property ID"
        value={propertyId}
        onChangeText={setPropertyId}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleBookAppointment}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Book Appointment</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// Example with Optimistic Updates
export function OptimisticUpdateExample() {
  const { properties, updateProperty, deleteProperty } = useProperties();
  const {
    data,
    setData,
    isLoading,
    error,
    optimisticUpdate,
    optimisticDelete,
  } = useOptimisticUpdate(properties, updateProperty, deleteProperty);

  const handleLikeProperty = (propertyId: number) => {
    optimisticUpdate(propertyId, { isLiked: true });
  };

  const handleDeleteProperty = (propertyId: number) => {
    optimisticDelete(propertyId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Properties with Optimistic Updates</Text>
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.propertyCard}>
            <Text style={styles.propertyTitle}>{item.title}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => handleLikeProperty(item.id)}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.deleteButton]}
                onPress={() => handleDeleteProperty(item.id)}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// Example with Pagination
export function PaginationExample() {
  const { getProperties } = useProperties();
  const {
    data,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadInitial,
    loadMore,
    refresh,
  } = usePagination((limit, cursor) => getProperties(limit, cursor), 10);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const renderProperty = ({ item }: { item: PropertyShow }) => (
    <View style={styles.propertyCard}>
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertyPrice}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Properties with Pagination</Text>
      <TouchableOpacity style={styles.button} onPress={refresh}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator style={styles.loadingMore} />
          ) : null
        }
      />
    </View>
  );
}

// Example with Form Submission
export function FormSubmissionExample() {
  const { updateMe } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    phone_number: "",
    location: "",
  });

  const { isSubmitting, error, submit, clearError } = useFormSubmit(
    updateMe,
    () => Alert.alert("Success", "Profile updated successfully!"),
    (error) => Alert.alert("Error", error)
  );

  const handleSubmit = () => {
    submit(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.fullname}
        onChangeText={(text) => setFormData({ ...formData, fullname: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phone_number}
        onChangeText={(text) =>
          setFormData({ ...formData, phone_number: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={formData.location}
        onChangeText={(text) => setFormData({ ...formData, location: text })}
      />
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Update Profile</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

// Example with Search
export function SearchExample() {
  const { properties } = useProperties();

  const searchProperties = async (query: string) => {
    // Simulate search - in real app, this would be an API call
    return properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase())
    );
  };

  const { query, results, isSearching, error, handleSearch } = useSearch(
    searchProperties,
    500
  );

  const renderProperty = ({ item }: { item: PropertyShow }) => (
    <View style={styles.propertyCard}>
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertyLocation}>{item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Properties</Text>
      <TextInput
        style={styles.input}
        placeholder="Search properties..."
        value={query}
        onChangeText={handleSearch}
      />
      {isSearching && <ActivityIndicator style={styles.loadingMore} />}
      <FlatList
        data={results}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  smallButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  propertyCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  propertyLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  errorText: {
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 10,
  },
  loadingMore: {
    padding: 20,
  },
});

export default {
  LoginExample,
  PropertyListExample,
  AppointmentBookingExample,
  OptimisticUpdateExample,
  PaginationExample,
  FormSubmissionExample,
  SearchExample,
};

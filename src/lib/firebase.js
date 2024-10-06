import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, onSnapshot, getDocs, Timestamp, query, collection, where, orderBy, addDoc } from "firebase/firestore";



// Your web app's Firebase configuration (use your own config)
import {firebaseConfig} from "./firebase_creds.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to get metadata -> current_event from Firestore
export async function getCurrentEvent() {
  const docRef = doc(db, "metadata", "current_event");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
}


/**
 * Sets up a Firestore listener for a specific document.
 * @param {string} docPath - The path to the Firestore document (e.g., 'your_collection_name/document_id').
 * @param {Function} callback - A callback function that will be called with the document data whenever it changes.
 * @returns {Function} A function that can be called to unsubscribe from the listener.
 */
export function listenForDocument(docPath, callback) {
    const docRef = doc(db, docPath); // Create a reference to the document
  
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      } else {
        console.log("No such document!");
        callback(null);
      }
    });
  }

export async function queryDocument(eventsQuery) {
  const querySnapshot = await getDocs(eventsQuery);
  return querySnapshot;
}

export async function getDay() {
  const currentDate = new Date();

  // Set the start and end time for the current day
  const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

  // Convert to Firestore Timestamps
  const startOfDayTimestamp = Timestamp.fromDate(startOfDay);
  const endOfDayTimestamp = Timestamp.fromDate(endOfDay);

  try {
    const eventsQuery = query(
      collection(db, 'test'),
      where('event_start', '>=', startOfDayTimestamp),
      where('event_start', '<=', endOfDayTimestamp),
      orderBy('event_start')
    );

    const querySnapshot = await queryDocument(eventsQuery);
    return querySnapshot;
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
  }
}

export async function getLast24Hours() {
  const currentDate = new Date();

  // Set the start time to 24 hours ago
  const startOfLast24Hours = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000));

  // Convert to Firestore Timestamps
  const startOfLast24HoursTimestamp = Timestamp.fromDate(startOfLast24Hours);
  const currentTimestamp = Timestamp.fromDate(currentDate);

  try {
    const eventsQuery = query(
      collection(db, 'events'),
      where('event_start', '>=', startOfLast24HoursTimestamp),
      where('event_start', '<=', currentTimestamp),
      orderBy('event_start')
    );

    const querySnapshot = await queryDocument(eventsQuery);
    return querySnapshot;
  } catch (error) {
    console.error('Error fetching Firestore data:', error);
  }
}


export async function getWeek() {
  // Get the current date and set it to yesterday (for demo purposes; TODO to adjust this logic)
  const currentDate = new Date();
  //currentDate.setDate(currentDate.getDate() - 1);  // Subtract one day from the current date
  
  // Calculate the start and end of the current week (Sunday to Saturday)
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);  // Set to the start of the day (midnight)
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);  // Set to the end of the day (11:59 PM)

  // Convert the start and end of the week to Firebase Timestamps for querying Firestore
  const startOfWeekTimestamp = Timestamp.fromDate(startOfWeek);
  const endOfWeekTimestamp = Timestamp.fromDate(endOfWeek);

  let querySnapshot;
  try {
      const eventsQuery = query(
          collection(db, 'test'),  // Query the 'events' collection
          where('event_start', '>=', startOfWeekTimestamp),  // Filter by start time after or equal to the start of the week
          where('event_start', '<=', endOfWeekTimestamp),  // Filter by end time before or equal to the end of the week
          orderBy('event_start')  // Order results by event start time
      );
      // Get the documents that match the query
      querySnapshot = await queryDocument(eventsQuery);
      console.log(querySnapshot.docs);
  } catch (error) {
      // Handle errors in fetching data from Firestore
      console.error('Error fetching Firestore data:', error);
  }
  return querySnapshot;
}

export async function getMonth() {
  const currentDate = new Date();

  // Set the start and end time for the current month
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0, 0); // First day of the month
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999); // Last day of the month

  // Convert to Firestore Timestamps
  const startOfMonthTimestamp = Timestamp.fromDate(startOfMonth);
  const endOfMonthTimestamp = Timestamp.fromDate(endOfMonth);

  try {
    const eventsQuery = query(
      collection(db, 'test'),
      where('event_start', '>=', startOfMonthTimestamp),
      where('event_start', '<=', endOfMonthTimestamp),
      orderBy('event_start')
    );

    return await queryDocument(eventsQuery);
  } catch (error) {
    console.error('Error fetching Firestore data for the month:', error);
  }
}

export async function getYear() {
  const currentDate = new Date();

  // Set the start and end time for the current year
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1, 0, 0, 0, 0); // January 1st of the current year
  const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999); // December 31st of the current year

  // Convert to Firestore Timestamps
  const startOfYearTimestamp = Timestamp.fromDate(startOfYear);
  const endOfYearTimestamp = Timestamp.fromDate(endOfYear);

  try {
    const eventsQuery = query(
      collection(db, 'test'),
      where('event_start', '>=', startOfYearTimestamp),
      where('event_start', '<=', endOfYearTimestamp),
      orderBy('event_start')
    );

    return await queryDocument(eventsQuery);
  } catch (error) {
    console.error('Error fetching Firestore data for the year:', error);
  }
}

const temp = {
  70: ["VOL+", "STUDY", "STUDYING", "ACTIVITY"],
  71: ["FUNC/STOP", "WORK", "WORKING", "ACTIVITY"],
  64: ["play/pause", "READ", "READING", "ACTIVITY"],
  67: ["FF_forward", "EXERCISE", "EXERCISING", "ACTIVITY"],
  21: ["VOL-", "EAT", "CHOWING DOWN", "ACTIVITY"],
  9: ["UP", "RESEARCH", "RESEARCHING", "ACTIVITY"],
  25: ["EQ", "GAME", "GAMING", "ACTIVITY"],
  13: ["ST/REPT", "CODE", "CODING", "ACTIVITY"],
  24: ["TWO", "CLEAN", "CLEANING", "ACTIVITY"],
  94: ["THREE", "SLEEP", "SLEEPING", "ACTIVITY"]
}

export async function mockData() {
  const arrays = Object.values(temp);
  const currentDate = new Date();

  let days = 0;
  let currentHour = 0;

  while (days < 30) {
    console.log(days);
    console.log(currentHour)
    while (currentHour < 23) {
      const randomIndex = Math.floor(Math.random() * arrays.length);
      let task = arrays[randomIndex];
      let hours = (Math.random() * 5);

      const eventStart = new Date(currentDate);
      eventStart.setHours(currentHour, 0, 0, 0);

      const eventEnd = new Date(eventStart);
      eventEnd.setHours(eventStart.getHours() + hours);

      const duration = hours * 60 * 60;

      try {
        const docRef = await addDoc(collection(db, "test"), {
          duration: duration,
          event_end: Timestamp.fromDate(eventEnd),
          event_start: Timestamp.fromDate(eventStart),
          event_type: task
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      currentHour += hours;
    }

    currentHour = Math.max(24 - currentHour, 0);
    currentDate.setDate(currentDate.getDate() - 1);
    days++;
  }
}
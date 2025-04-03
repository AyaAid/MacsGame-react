import {useState } from "react";
import mqtt from "mqtt";

export default function useMQTT() {
  const [setMessages] = useState({});


      const MQTT_BROKER_URL = "wss://test.mosquitto.org:8081/mqtt";
      const MQTT_TOPIC = "macs/game";
      const MQTT_TOPIC_TARGET1 = "macs/score/target1";
      const MQTT_TOPIC_TARGET2 = "macs/score/target2";
      const MQTT_TOPIC_TARGET3 = "macs/score/target3";

    const client = mqtt.connect(MQTT_BROKER_URL); 

    const topics = [
      MQTT_TOPIC,
      MQTT_TOPIC_TARGET1,
      MQTT_TOPIC_TARGET2,
      MQTT_TOPIC_TARGET3,
    ];


    client.on("connect", () => {
      console.log("Connected to MQTT broker");

      for (const topic of topics) {
        client.subscribe(topic, (err) => {
          if (err) {
            console.error("Subscription error:", err);
          } else {
            console.log("Subscribed to topic:", topic);
          }
        });
      }
    });

    client.on("message", (topic, payload) => {
      const msg = payload.toString();
              console.log(`Received message on topic ${topic}: ${msg}`),
                setMessages((prev) => ({
                  ...prev,
                  [topic]: msg,
                }));
      
    });

    return () => {
      if (client.connected) {
        client.end();
      }
    };
  }
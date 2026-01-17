# Intelligent Demand Forecasting & Dynamic Pricing Simulator

## Overview

This project is an **ML-first pricing intelligence system** visualized through a real-time seat booking simulator inspired by airline and entertainment booking platforms (e.g., airlines, BookMyShow).

The goal of the project is **not** to build a production ticketing app. Instead, it focuses on **how machine learning models can forecast demand, learn price sensitivity, and recommend optimal prices under real-time, concurrent user behavior**.

The seat booking UI acts as a **controlled simulation environment** that generates realistic interaction data (views, holds, bookings) required for training and evaluating ML-driven pricing decisions.

---

## Core Objectives

1. **Forecast near-term demand** using ML models trained on real-time booking patterns
2. **Learn price elasticity** (how demand changes as price changes)
3. **Recommend optimal prices** that balance revenue and conversion
4. **Explain pricing decisions transparently** using model outputs and feature importance
5. **Simulate real-world constraints** such as seat locking, expiry timers, and concurrent users

---

## Why This Project

Dynamic pricing systems used by airlines, ride-hailing apps, and ticketing platforms rely heavily on **predictive models**, not hard-coded rules.

This project demonstrates:

* Practical ML usage beyond toy datasets
* Integration of ML models into a live system
* Decision intelligence rather than UI-driven logic
* Explainable pricing behavior instead of black-box AI

---

## System Architecture (High-Level)

```
User Interactions (view / hold / book)
        ↓
Real-Time Event Stream
        ↓
Feature Aggregation Layer
        ↓
ML Models (Forecasting & Elasticity)
        ↓
Pricing Recommendation Engine
        ↓
Real-Time UI Updates (WebSockets)
```

---

## Machine Learning Components

### 1. Demand Forecasting Model

**Problem Type:** Time-series regression

**Purpose:** Predict how many seats are likely to be booked in the next N minutes.

**Input Features:**

* Seats booked in last 1, 5, 10 minutes
* Active viewers
* Active seat holds
* Current price
* Time to departure
* Seats remaining

**Output:**

* Expected bookings in the next time window

---

### 2. Price Elasticity Model

**Problem Type:** Supervised regression / probabilistic modeling

**Purpose:** Learn how booking probability changes with price.

**Input Features:**

* Current seat price
* Price change (delta)
* Time to departure
* Seat category
* Historical conversion rate

**Output:**

* Probability of booking at a given price

---

### 3. Pricing Recommendation Engine

This component combines ML predictions with business constraints.

**Logic:**

* Simulate multiple candidate prices
* Estimate expected demand using ML models
* Compute expected revenue for each price
* Recommend the price that maximizes expected revenue while maintaining conversion thresholds

> ML models **recommend** prices; deterministic rules apply final constraints.

---

## Explainable Pricing

Every price change is accompanied by an explanation shown in the UI, such as:

> "Price increased due to high predicted demand (8 bookings expected in next 5 minutes) with only 6 seats remaining."

Explainability techniques include:

* Feature importance
* Demand vs capacity comparisons
* Price sensitivity curves

---

## Simulation Environment

Since real airline data is unavailable, the system includes a **demand simulator** that generates:

* Normal booking periods
* Demand spikes
* Last-minute rush behavior
* Price-sensitive vs price-insensitive users

This simulated environment allows controlled ML experimentation similar to real-world A/B testing setups.

---

## Real-Time System Features

Although ML is the primary focus, the system also demonstrates production-relevant engineering concepts:

* Concurrent seat selection and locking
* Seat hold expiration timers
* Prevention of double booking
* WebSocket-based real-time updates
* Event-driven architecture

These features exist to **support realistic ML data generation**, not as the main objective.

---

## Tech Stack (Indicative)

* **Frontend:** React / Canvas-based seat map
* **Backend:** Node.js / Python services
* **Real-Time:** WebSockets
* **ML:** Scikit-learn / XGBoost (forecasting & elasticity)
* **Data:** Simulated event streams

---

## What This Project Is NOT

* ❌ A payment-enabled ticket booking app
* ❌ A deep learning or reinforcement learning showcase
* ❌ A rule-only pricing engine
* ❌ A UI-focused clone project

---

## Resume Positioning

> Built an ML-driven demand forecasting and dynamic pricing recommendation system with a real-time booking simulator to study price elasticity, concurrent user behavior, and explainable pricing decisions.

---

## Future Extensions

* A/B testing different pricing strategies
* Reinforcement learning for long-term revenue optimization
* Confidence intervals on demand forecasts
* Model drift detection

---

## Key Takeaway

This project treats **pricing as a prediction and optimization problem**, not a UI feature. The booking interface exists to generate realistic demand signals and visualize ML-driven decisions in real time.

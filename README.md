# ⚡ FinanceAI: Financial Next Best Action (NBA) System

## 📚 Overview
The **FinanceAI (Next Best Action)** system is a Big Data recommendation engine designed for banks and fintech applications. Instead of showing the same financial products to all users, this system analyzes historical user-interaction data and predicts the **Top 3 most relevant financial actions** a user should take next (e.g., investing in Gold, prioritizing Debt Repayment).

This project demonstrates the end-to-end flow of big data analysis: storing heavy data, processing it in-memory, running a machine learning algorithm, and presenting it beautifully to end users.

---

## 🌟 Key Features
- **Big Data Scale Architecture:** Built conceptually around distributed data pipelines (HDFS → Spark → Spark MLlib).
- **Collaborative Filtering (ALS):** Employs the **Alternating Least Squares (ALS)** algorithm, using matrix factorization to find hidden patterns in a sparse user-action matrix (the same core logic used by Netflix and Amazon).
- **Cold Start Fallback System:** Built-in logic to gracefully handle brand new users by skipping ML matrix factorization and deploying globally "Most Popular" financial actions to prevent errors.
- **Interactive Simulation Frontend:** A strictly zero-dependency, vanilla HTML/CSS/JS frontend that visually simulates:
  - Spark Master node terminal execution logs.
  - Generative user profiling (Age, Income, Goal).
  - Dynamic Model Evaluation Metrics (RMSE, Processing Time).
  - Native JSON file export matching HDFS outputs.

---

## 🏗️ System Architecture (The 5 Layers)

1. **📥 Data Layer:** Raw CSV data containing user interactions formatted as `userId | actionId | rating`.
2. **🗄️ Storage Layer (Hadoop HDFS):** Large datasets are stored in Hadoop Distributed File System for fault tolerance and distributed node access.
3. **⚡ Processing Layer (Apache Spark):** Spark pulls the CSV from HDFS into an in-memory DataFrame, running 100x faster than traditional MapReduce jobs.
4. **🧠 ML Layer (ALS - Spark MLlib):** The ALS algorithm trains the dataset via iterative passes, narrowing down the minimal error to accurately predict unrated financial actions for a user.
5. **📤 Output Layer:** Personalized Top 3 recommendations are outputted as JSON documents and stored sequentially in HDFS.

---

## 💼 Financial Action Catalog
The dataset simulates various financial operations, categorized by risk and purpose:
1. `🛡️ Emergency Fund` (Safety)
2. `📈 S&P 500 ETF` (Investment)
3. `💳 Debt Repayment` (Debt Management)
4. `🥇 Gold Investment` (Investment)
5. `💰 Tax Saving Scheme` (Tax Management)

---

## 💻 Tech Stack
- **Hadoop HDFS:** Chosen for scalable, fault-tolerant data storage.
- **Apache Spark:** Chosen for rapid, in-memory data processing.
- **Spark MLlib (ALS):** Chosen because ALS efficiently handles sparse matrices (few user interactions across many potential actions) utilizing matrix factorization.
- **Frontend Presentation:** HTML5, CSS3 (Glassmorphism design, custom animations), Vanilla JavaScript.

---

## 🚀 How to Run the Frontend Demo

No heavy `npm` installations or frameworks are required.

### **Method 1: Direct Execution**
1. Navigate to the `frontend/` directory.
2. Double click `index.html` to open it in your default web browser (Chrome, Firefox, Safari).

### **Method 2: Local Server (Preferred for strict CORS/exporting)**
1. Open your terminal.
2. Navigate to the frontend directory:
   ```bash
   cd /home/joyboy/finance-nba/frontend
   ```
3. Start a standard local python server:
   ```bash
   python3 -m http.server 8080
   ```
4. Open your browser and navigate to: `http://localhost:8080`

---

## 📝 Presentation Guide / Teacher Viva Tips

When demonstrating the project, follow this flow:
1. **Explain the problem:** Not all users need a Tax Saving Scheme. If a user is deep in credit card debt, they need a Debt Repayment suggestion. Explain how NBA (Next Best Action) solves this.
2. **Show the Pipeline:** Mention how your data goes from HDFS to Spark to ALS. 
3. **The Live Demo:** 
   - Analyze a standard user (e.g., User `127`). Point to the Spark execution logs, the dynamically generated User Profile, and how the Output visually matches their risk profile.
4. **The "Cold Start" Trick:** Explain how Machine Learning fails when a new user has zero data. Click the **"New User"** button in the demo. Show the terminal throwing a `[WARN]` tag, bypassing ALS, and dropping back to a "Popularity Strategy." This guarantees extra points from the examiner.

---
*Built for Big Data Analytics*

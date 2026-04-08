package com.finance;

import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;

import org.apache.spark.ml.recommendation.ALS;
import org.apache.spark.ml.recommendation.ALSModel;

import java.util.HashMap;
import java.util.Map;

public class App {

    public static void main(String[] args) {

        SparkSession spark = SparkSession
                .builder()
                .appName("Finance Recommendation")
                .master("local[*]")
                .getOrCreate();

        Dataset<Row> data = spark.read()
                .option("header","true")
                .option("inferSchema","true")
                .csv("hdfs:///finance/data/finance_nba_data.csv");

        ALS als = new ALS()
                .setUserCol("userId")
                .setItemCol("actionId")
                .setRatingCol("rating")
                .setMaxIter(5);

        ALSModel model = als.fit(data);

        Dataset<Row> rec = model.recommendForAllUsers(3);

        rec.show(false);

        // Human readable mapping
        Map<Integer,String> actions = new HashMap<>();

        actions.put(1,"Start Emergency Fund");
        actions.put(2,"Buy S&P 500 ETF");
        actions.put(3,"Debt Repayment");
        actions.put(4,"Gold Investment");
        actions.put(5,"Tax Saving Scheme");

        System.out.println("\n===== Human Readable Financial Advice =====");

        rec.collectAsList().forEach(row -> {

            int userId = row.getInt(0);

            System.out.println("\nUser " + userId + " should consider:");

            row.getList(1).forEach(item -> {

                Row r = (Row)item;
                int actionId = r.getInt(0);

                System.out.println(" → " + actions.get(actionId));
            });

        });

        spark.stop();
    }
}

package com.evinced.example;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        plugin = {"pretty", "html:reports/index.html"},
        glue = "com.evinced.example",
        features = "classpath:com/evinced/example"
)

public class RunCucumberTests {
}

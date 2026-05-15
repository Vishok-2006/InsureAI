package com.insurai.config;

import com.insurai.model.Plan;
import com.insurai.repository.PlanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedPlans(PlanRepository planRepository, JdbcTemplate jdbcTemplate) {
        return args -> {
            if (planRepository.count() > 0) {
                return;
            }

            List<SeedPlan> plans = List.of(
                new SeedPlan("LIC Corporate Care", Plan.PlanCategory.HEALTH, 2499.00, 500000.00,
                    "Entry-level corporate health insurance with cashless hospitalization and pre/post-hospitalization cover.",
                    "Employees up to 60 years with optional spouse and child add-on",
                    List.of("Cashless network hospitals", "Pre and post hospitalization", "Day-care procedures", "Digital health card"), false),
                new SeedPlan("Star Family Floater Plus", Plan.PlanCategory.HEALTH, 4199.00, 1000000.00,
                    "Family floater plan designed for working professionals with OPD support and maternity benefits.",
                    "Employees, spouse, and up to two dependent children",
                    List.of("Family floater coverage", "Maternity and newborn cover", "Annual health checkup", "AI-assisted claim guidance"), true),
                new SeedPlan("HDFC Ergo Secure Life", Plan.PlanCategory.LIFE, 1899.00, 2500000.00,
                    "Group life insurance offering strong term protection and nominee support for employees.",
                    "All confirmed employees from day 1 of policy activation",
                    List.of("Group term life cover", "Nominee settlement support", "Accidental death rider", "24x7 claims helpdesk"), false),
                new SeedPlan("ICICI Accident Shield", Plan.PlanCategory.ACCIDENTAL, 999.00, 1500000.00,
                    "Personal accident protection for workplace and travel incidents with disability payout benefits.",
                    "Employees and field staff with active payroll status",
                    List.of("Accidental death benefit", "Permanent disability cover", "Ambulance expenses", "Emergency assistance hotline"), false),
                new SeedPlan("Tata AIG Wellness Add-on", Plan.PlanCategory.ADDON, 699.00, 200000.00,
                    "Affordable add-on for preventive care, diagnostics, teleconsultation, and wellness reimbursements.",
                    "Available only with an active base health plan",
                    List.of("Preventive diagnostics", "Doctor teleconsultation", "Pharmacy discounts", "Wellness rewards"), false)
            );

            for (SeedPlan plan : plans) {
                jdbcTemplate.update(
                    "insert into plans (plan_name, category, monthly_premium, coverage_amount, description, eligibility, is_active, is_featured, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, current_timestamp, current_timestamp)",
                    plan.planName(),
                    plan.category().name(),
                    plan.monthlyPremium(),
                    plan.coverageAmount(),
                    plan.description(),
                    plan.eligibility(),
                    true,
                    plan.featured()
                );

                Long planId = jdbcTemplate.queryForObject("select id from plans where plan_name = ?", Long.class, plan.planName());
                for (String feature : plan.features()) {
                    jdbcTemplate.update("insert into plan_features (plan_id, feature) values (?, ?)", planId, feature);
                }
            }
        };
    }

    private record SeedPlan(
        String planName,
        Plan.PlanCategory category,
        double monthlyPremium,
        double coverageAmount,
        String description,
        String eligibility,
        List<String> features,
        boolean featured
    ) {}
}

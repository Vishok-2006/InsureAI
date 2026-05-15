package com.insurai.service;

import com.insurai.model.Plan;
import com.insurai.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;

    public List<Plan> getAllActivePlans() {
        return planRepository.findByIsActiveTrue();
    }

    public List<Plan> getFeaturedPlans() {
        return planRepository.findByIsFeaturedTrue();
    }

    public Plan getPlanById(Long id) {
        return planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found"));
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }
}

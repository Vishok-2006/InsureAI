package com.insurai.controller;

import com.insurai.dto.ApiResponse;
import com.insurai.model.Plan;
import com.insurai.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Plan>>> getPlans(
            @RequestParam(required = false) boolean featured) {
        List<Plan> plans = featured ? planService.getFeaturedPlans() : planService.getAllActivePlans();
        return ResponseEntity.ok(ApiResponse.success("Plans retrieved successfully", plans));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Plan>> getPlanById(@PathVariable Long id) {
        Plan plan = planService.getPlanById(id);
        return ResponseEntity.ok(ApiResponse.success("Plan retrieved", plan));
    }
}

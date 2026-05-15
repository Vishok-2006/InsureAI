package com.insurai.service;

import com.insurai.model.Notification;
import com.insurai.model.Notification.NotificationType;
import com.insurai.model.User;
import com.insurai.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    // private final JavaMailSender mailSender; // Add if bean is configured

    @Transactional
    public void createNotification(User user, String title, String message, NotificationType type) {
        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .type(type)
                .channel("IN_APP")
                .isRead(false)
                .isSent(true)
                .sentAt(LocalDateTime.now())
                .build();
        notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForUser(User user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Transactional
    public void markAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setIsRead(true);
            notificationRepository.save(n);
        });
    }

    @Async
    public void sendEmail(String to, String subject, String body) {
        // Placeholder for actual email sending
        System.out.println("Sending Email to: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
        
        /*
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no-reply@insurai.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
        */
    }
}

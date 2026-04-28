package com.portfolio.taejuneng.config;

import com.portfolio.taejuneng.service.NotificationSubscriber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisPassword;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;

@Configuration
public class RedisConfig {

    public static final String NOTIFICATION_CHANNEL = "ddookddak-notification";

    @Value("${spring.data.redis.host}")
    private String redisHost;

    @Value("${spring.data.redis.port}")
    private int redisPort;

    @Value("${spring.data.redis.username:default}")
    private String redisUsername;

    @Value("${spring.data.redis.password}")
    private String redisPassword;

    @Value("${spring.data.redis.ssl.enabled:true}")
    private boolean redisSslEnabled;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisConfig =
                new RedisStandaloneConfiguration(redisHost, redisPort);

        if (redisUsername != null && !redisUsername.isBlank()) {
            redisConfig.setUsername(redisUsername);
        }

        if (redisPassword != null && !redisPassword.isBlank()) {
            redisConfig.setPassword(RedisPassword.of(redisPassword));
        }

        LettuceClientConfiguration.LettuceClientConfigurationBuilder clientBuilder =
                LettuceClientConfiguration.builder();

        if (redisSslEnabled) {
            clientBuilder.useSsl();
        }

        return new LettuceConnectionFactory(redisConfig, clientBuilder.build());
    }

    @Bean
    public ChannelTopic notificationTopic() {
        return new ChannelTopic(NOTIFICATION_CHANNEL);
    }

    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(
            RedisConnectionFactory connectionFactory,
            ChannelTopic notificationTopic,
            NotificationSubscriber notificationSubscriber
    ) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener((MessageListener) notificationSubscriber, notificationTopic);
        return container;
    }
}
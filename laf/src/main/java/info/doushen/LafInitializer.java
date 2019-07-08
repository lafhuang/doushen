package info.doushen;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * LafInitializer
 *
 * @author huangdou
 * @date 2019/6/22
 */
public class LafInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(LafApplication.class);
    }

}

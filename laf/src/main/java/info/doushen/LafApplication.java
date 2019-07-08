package info.doushen;

import com.github.pagehelper.PageHelper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.Properties;

/**
 * LafApplication
 *
 * @author huangdou
 * @date 2018/12/4
 */
@EnableAutoConfiguration(exclude = {
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class
})
@EnableTransactionManagement
@ServletComponentScan
@MapperScan({"info.doushen.*.mapper", "info.doushen.*.*.mapper"})
@SpringBootApplication
@EnableCaching
public class LafApplication {

	public static void main(String[] args) {
		SpringApplication.run(LafApplication.class, args);
		System.out.println("==================================");
		System.out.println("=======doushen启动成功！！！=========");
		System.out.println("==================================");
	}

	@Bean
	public PageHelper pageHelper(){
		PageHelper pageHelper = new PageHelper();
		Properties properties = new Properties();
		properties.setProperty("offsetAsPageNum","true");
		properties.setProperty("rowBoundsWithCount","true");
		properties.setProperty("reasonable","true");
		properties.setProperty("dialect","postgresql");
		pageHelper.setProperties(properties);
		return pageHelper;
	}

}



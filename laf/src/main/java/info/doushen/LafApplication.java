package info.doushen;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

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
//@EnableCaching
public class LafApplication {

	public static void main(String[] args) {
		SpringApplication.run(LafApplication.class, args);
		System.out.println("==================================");
		System.out.println("=======doushen启动成功！！！=========");
		System.out.println("==================================");
	}

}



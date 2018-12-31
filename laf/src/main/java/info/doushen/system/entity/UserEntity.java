package info.doushen.system.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * UserEntity
 *
 * @author huangdou
 * @date 2018/12/4
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class UserEntity extends BaseEntity {

    /** 用户名 */
    private String userName;
    /** 姓名 */
    private String name;
    /** 密码 */
    private String password;
    /** 所属部门 */
    private int deptId;
    /** 邮箱 */
    private String email;
    /** 手机号 */
    private String mobile;
    /** 性别 */
    /** 0-女; 1-男 */
    private String sex;
    /** 出身日期 */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birth;
    /** 头像ID */
    private int picId;
    /** 地址 */
    private String address;
    /** 省份 */
    private String province;
    /** 所在城市 */
    private String city;
    /** 所在地区 */
    private String district;
    /** 状态 */
    /** 0-禁用; 1-启用 */
    private String status;

}

package info.doushen.common.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * BaseEntity
 *
 * @author huangdou
 * @date 2018/12/4
 */
@Data
public class BaseEntity implements Serializable {

    /** 主键 */
    private int id;
    /** 创建人 */
    private int createBy;
    /** 创建时间 */
    private String createTime;
    /** 更新人 */
    private int updateBy;
    /** 创建时间 */
    private String updateTime;

}

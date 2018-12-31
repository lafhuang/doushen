package info.doushen.system.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * DeptEntity
 *
 * @author huangdou
 * @date 2018/12/5
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class DeptEntity extends BaseEntity {

    /** 部门名称 */
    private String deptName;
    /** 上级部门 */
    /** 一级部门为0 */
    private int parentId;
    /** 排序 */
    private int sort;

}

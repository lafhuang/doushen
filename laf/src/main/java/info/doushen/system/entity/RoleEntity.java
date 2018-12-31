package info.doushen.system.entity;

import info.doushen.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * RoleEntity
 *
 * @author huangdou
 * @date 2018/12/6
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class RoleEntity extends BaseEntity {

    /** 角色名称 */
    private String roleName;
    /** 角色标识 */
    private String roleSign;
    /** 角色描述 */
    private String roleDesc;

}

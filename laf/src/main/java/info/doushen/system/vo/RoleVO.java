package info.doushen.system.vo;

import info.doushen.common.vo.BaseVO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * RoleVO
 *
 * @author huangdou
 * @date 2018/12/6
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class RoleVO extends BaseVO {

    /** 角色ID */
    private int roleId;
    /** 角色名称 */
    private String roleName;
    /** 角色标识 */
    private String roleSign;
    /** 角色描述 */
    private String roleDesc;
    /** 菜单权限列表 */
    private List<Integer> menuIdList;

}

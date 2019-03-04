package info.doushen.system.mapper;

import info.doushen.common.utils.Query;
import info.doushen.system.entity.RoleEntity;

import java.util.List;
import java.util.Map;

/**
 * RoleMapper
 *
 * @author huangdou
 * @date 2018/12/6
 */
public interface RoleMapper {

    /**
     * 获取角色记录数
     *
     * @param query
     * @return
     */
    int count(Query query);

    /**
     * 获取角色列表
     *
     * @param query
     * @return
     */
    List<RoleEntity> list(Query query);

    /**
     * 获取角色信息
     *
     * @param id
     * @return
     */
    RoleEntity get(Integer id);

    /**
     * 更新角色信息
     *
     * @param role
     * @return
     */
    int update(RoleEntity role);

    /**
     * 保存角色信息
     *
     * @param role
     */
    int save(RoleEntity role);

    /**
     * 删除角色
     *
     * @param id
     * @return
     */
    int remove(int id);

}

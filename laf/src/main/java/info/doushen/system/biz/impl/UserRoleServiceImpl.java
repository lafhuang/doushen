package info.doushen.system.biz.impl;

import info.doushen.system.biz.UserRoleService;
import info.doushen.system.mapper.UserRoleMapper;
import info.doushen.system.vo.UserVO;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * UserRoleServiceImpl
 *
 * @author huangdou
 * @date 2018-12-07
 */
@Service
public class UserRoleServiceImpl implements UserRoleService {

    @Autowired
    private UserRoleMapper userRoleMapper;

    @Override
    public List<Integer> listRoleId(int userId) {
        return userRoleMapper.listRoleId(userId);
    }

    @Override
    @Transactional
    public void batchUpdate(UserVO user) {
        userRoleMapper.deleteByUserId(user.getId());
        if (CollectionUtils.isNotEmpty(user.getRoleIdList())) {
            Map<String, Object> params = new HashMap<>();
            params.put("userId", user.getId());
            params.put("roleIdList", user.getRoleIdList());
            userRoleMapper.batchInsert(params);
        }
    }

}

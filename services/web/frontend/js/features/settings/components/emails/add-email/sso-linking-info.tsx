import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { DomainInfo } from './input'
import { ExposedSettings } from '../../../../../../../types/exposed-settings'
import getMeta from '../../../../../utils/meta'
import { useLocation } from '../../../../../shared/hooks/use-location'
import ButtonWrapper from '@/features/ui/components/bootstrap-5/wrappers/button-wrapper'

type SSOLinkingInfoProps = {
  domainInfo: DomainInfo
  email: string
}

function SsoLinkingInfo({ domainInfo, email }: SSOLinkingInfoProps) {
  const { samlInitPath } = getMeta('ol-ExposedSettings') as ExposedSettings
  const { t } = useTranslation()
  const location = useLocation()

  const [linkAccountsButtonDisabled, setLinkAccountsButtonDisabled] =
    useState(false)

  function handleLinkAccountsButtonClick() {
    setLinkAccountsButtonDisabled(true)
    location.assign(
      `${samlInitPath}?university_id=${domainInfo.university.id}&auto=/user/settings&email=${email}`
    )
  }

  return (
    <>
      <p className="affiliations-table-label">{domainInfo.university.name}</p>
      <p>
        <Trans
          i18nKey="to_add_email_accounts_need_to_be_linked_2"
          components={[<strong />]} // eslint-disable-line react/jsx-key
          values={{ institutionName: domainInfo.university.name }}
          shouldUnescape
          tOptions={{ interpolation: { escapeValue: true } }}
        />
      </p>
      <p>
        <Trans
          i18nKey="doing_this_will_verify_affiliation_and_allow_log_in_2"
          components={[<strong />]} // eslint-disable-line react/jsx-key
          values={{ institutionName: domainInfo.university.name }}
          shouldUnescape
          tOptions={{ interpolation: { escapeValue: true } }}
        />{' '}
        <a
          href="/learn/how-to/Institutional_Login"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('find_out_more_about_institution_login')}.
        </a>
      </p>
      <ButtonWrapper
        variant="primary"
        className="btn-link-accounts"
        size="small"
        disabled={linkAccountsButtonDisabled}
        onClick={handleLinkAccountsButtonClick}
      >
        {t('link_accounts_and_add_email')}
      </ButtonWrapper>
    </>
  )
}

export default SsoLinkingInfo
